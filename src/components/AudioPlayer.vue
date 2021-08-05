<template>
  <div>
    <v-card
      class="default-v-card pa-5 justify-center"
      elevation="0"
      height="calc(100vh - 145px)"
    >
      <v-card-title class="pt-2 pb-6">
        <v-btn
          icon
          @click.stop="drawer = !drawer"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <!--        <v-spacer />-->
        <!--        <v-tooltip-->
        <!--          v-if="!!userInfo.authKey"-->
        <!--          bottom-->
        <!--        >-->
        <!--          <template v-slot:activator="{ on, attrs }">-->
        <!--            <v-btn-->
        <!--              icon-->
        <!--              v-bind="attrs"-->
        <!--              v-on="on"-->
        <!--              @click.stop="handleCastLikeClick"-->
        <!--            >-->
        <!--              <v-icon color="primary">-->
        <!--                {{ likeIcon }}-->
        <!--              </v-icon>-->
        <!--            </v-btn>-->
        <!--          </template>-->
        <!--          <span>Like</span>-->
        <!--        </v-tooltip>-->
      </v-card-title>

      <v-card-text v-if="!!musicPlaylist[currentSong]">
        <v-img
          :key="currentSong"
          class="rounded-lg"
          width="calc(100vw)"
          max-height="500"
          aspect-ratio="1"
          :src="musicPlaylist[currentSong].image"
        />
      </v-card-text>
      <v-card-actions class="flex-column">
        <!--캐스트 정보-->
        <p
          class="font-weight-bold text-h6 black--text pt-4 ma-0"
        >
          {{ musicPlaylist[currentSong].title }}
        </p>
        <v-btn
          class="font-weight-light black--text"
          small
          text
          @click="showAuthorProfile"
        >
          {{ musicPlaylist[currentSong].author.nickname }}
        </v-btn>

        <!--컨트롤러-->
        <v-row
          no-gutters
          align="center"
          class="justify-center"
        >
          <v-btn
            :disabled="currentSong <= 0"
            icon
            @click="handleClickSkipPrevious"
          >
            <v-icon>mdi-skip-previous</v-icon>
          </v-btn>
          <v-btn
            v-if="isPaused"
            icon
            x-large
            color="#ff4100"
            :disabled="!musicPlaylist"
            @click="handleClickPlay"
          >
            <v-icon>mdi-play-circle</v-icon>
          </v-btn>
          <v-btn
            v-else
            icon
            x-large
            @click="handleClickPause"
          >
            <v-icon>mdi-pause</v-icon>
          </v-btn>
          <v-btn
            icon
            :disabled="musicPlaylist.length - 1 === currentSong"
            @click="handleClickSkipNext"
          >
            <v-icon>mdi-skip-next</v-icon>
          </v-btn>
        </v-row>

        <v-row class="justify-space-between mt-4 mr-4 mb-0 ml-4">
          <p class="ma-0">
            {{ getDuration(currentTime) }}
          </p>
          <p class="ma-0">
            {{ getDuration(musicPlaylist[currentSong].duration) }}
          </p>
        </v-row>

        <v-row>
          <v-slider
            color="#ff4100"
            :min="0"
            :max="100"
            :value="playProgress"
            @change="handleChangeProgress"
          />
        </v-row>
      </v-card-actions>

      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-list
          dense
          two-line
        >
          <v-list-item
            v-for="(item, index) in musicPlaylist"
            :key="item.title"
            link
            @click="handleClickInPlaylist(index)"
          >
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.author.nickname }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment';
import { createNamespacedHelpers } from 'vuex';

const { mapGetters: mapGettersApp } = createNamespacedHelpers('app');

export default {
  name: 'AudioPlayer',

  data: () => ({
    drawer: null,
    // isLoading: true,
    likeIcon: 'mdi-heart-outline',

    // 컨트롤러
    currentTime: 0,
    bufferedTime: 0,
    duration: 0,
    playProgress: 0,
    isPaused: true,
    audioInterval: null,
    musicAudio: null,
    currentSong: 0,
  }),

  computed: {
    ...mapGettersApp([
      'musicPlaylist',
    ]),
  },

  watch: {
    currentSong(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.loadAudio();
      }
    },
  },

  created() {
    // 오디오 플레이어 관련 설정을 한다.
    this.createAudio();
    this.addAudioEventListener();
  },

  mounted() {
    // 오디오 플레이어 데이터를 초기화한다.
    this.loadAudio();
  },

  methods: {
    /**
     * 캐스트를 등록한 유저의 정보를 새탭에서 보여준다.
     */
    showAuthorProfile() {
      window.open(
        `https://www.spooncast.net/kr/profile/${this.musicPlaylist[this.currentSong].author.id}`,
        '_blank',
      );
    },

    /**
     * 오디오플레이어를 생성 하는 함수
     */
    createAudio() {
      this.musicAudio = document.createElement('audio');
      this.musicAudio.autoplay = false;
      this.musicAudio.preload = 'none';
    },

    /**
     * 오디오 관련 이벤트 리스너들을 세팅하는 함수
     */
    addAudioEventListener() {
      this.musicAudio.onloadedmetadata = () => {
        this.duration = this.musicAudio.duration;
      };

      this.musicAudio.onwaiting = () => {
      };

      this.musicAudio.onplaying = () => {
        this.clearAudioInterval();
        this.setAudioInterval();
      };

      this.musicAudio.onpause = () => {
        if (
          Math.floor(this.musicAudio.currentTime)
          >= Math.floor(this.musicAudio.duration)
        ) {
          this.clearAudioInterval();
          this.setStop();
        }
      };

      this.musicAudio.onended = () => {
        this.clearAudioInterval();
        this.setStop();
      };

      this.musicAudio.onerror = () => {
        this.clearAudioInterval();
        this.setStop();
      };
    },

    /**
     * 오디오플레이어를 데이터를 초기화 하는 함수
     */
    loadAudio() {
      console.log('loadAudio: ', this.musicPlaylist[this.currentSong].url);
      this.musicAudio.src = this.musicPlaylist[this.currentSong].url;
      this.musicAudio.load();
    },

    /**
     * 오디오에서 사용되는 인터벌을 초기화 하는 함수
     */
    clearAudioInterval() {
      if (this.audioInterval) {
        clearInterval(this.audioInterval);
        this.audioInterval = null;
      }
    },

    /**
     * 오디오에서 사용되는 인터벌을 세팅 하는 함수
     */
    setAudioInterval() {
      if (this.musicAudio) {
        this.currentTime = this.musicAudio.currentTime;
        this.isPaused = false;
      }
      this.audioInterval = setInterval(() => {
        if (this.musicAudio) {
          const { currentTime, duration } = this.musicAudio;
          const playProgress = duration > 0 ? (currentTime / duration) * 100 : 0;
          this.currentTime = currentTime;
          this.playProgress = playProgress;
        }
      }, 50);
    },

    /**
     * 오디오를 중단하는 함수
     */
    setStop() {
      const { duration, paused } = this.musicAudio;
      if (duration) this.musicAudio.currentTime = 0;
      if (!paused) this.musicAudio.pause();

      this.isPaused = this.musicAudio.paused;
      this.currentTime = 0;
      this.duration = 0;
      this.playProgress = 0;
    },

    /**
     * 오디오 플레이어 이전곡 듣기 버튼을 클릭했을 때 호출되는 함수
     */
    handleClickSkipPrevious() {
      this.setStop();
      this.currentSong -= 1;
      this.musicAudio.src = this.musicPlaylist[this.currentSong].url;
    },

    /**
     * 오디오 플레이어 재생 버튼을 클릭했을 때 호출되는 함수
     */
    handleClickPlay() {
      const { duration } = this.musicAudio;
      if (duration) this.musicAudio.play();

      this.isPaused = false;
    },

    /**
     * 오디오 플레이어 일시정지 버튼을 클릭했을 때 호출되는 함수
     */
    handleClickPause() {
      const { paused } = this.musicAudio;
      if (!paused) this.musicAudio.pause();

      this.isPaused = true;
    },

    /**
     * 오디오 플레이어 다음곡 듣기 버튼을 클릭했을 때 호출되는 함수
     */
    handleClickSkipNext() {
      this.setStop();
      this.currentSong += 1;
      this.musicAudio.src = this.musicPlaylist[this.currentSong].url;
    },

    handleClickInPlaylist(index) {
      this.setStop();
      this.drawer = false;
      this.currentSong = index;
      this.musicAudio.src = this.musicPlaylist[this.currentSong].url;
    },

    /**
     * 오디오의 길이를 mm:ss 포맷으로 변경하는 함수
     * @param sec 오디오의 길이 (초)
     */
    getDuration(sec) {
      return moment.utc(sec * 1000).format('HH:mm:ss');
    },

    /**
     * 오디오 플레이어 진행바를 변경했을때 호출되는 함수
     * @param progress 진행바의 위치
     */
    handleChangeProgress(progress) {
      const currentTime = this.duration * (progress / 100);
      this.musicAudio.currentTime = currentTime;
      this.currentTime = currentTime;
    },

    /**
     * 캐스트 좋아요를 눌렀을 때 호출되는 함수
     */
    // async handleCastLikeClick() {
    //   const { id } = this.musicPlaylist[this.currentSong];
    //
    //   try {
    //     const {
    //       data: {
    //         status_code: statusCode,
    //         detail,
    //       },
    //     } = await SPOON_CAST_API.CAST_LIKE(
    //       this.userInfo.authKey, id,
    //     );
    //
    //     if (statusCode === 200 && detail === 'Success') {
    //       if (this.likeIcon === 'mdi-heart-outline') {
    //         this.likeIcon = 'mdi-heart';
    //       } else if (this.likeIcon === 'mdi-heart') {
    //         this.likeIcon = 'mdi-heart-outline';
    //       }
    //     }
    //   } catch (err) {
    //     console.error(err);
    //   }
    // },
  },
};
</script>

<style scoped>
.v-card__actions,
.row {
  width: inherit;
  min-width: 300px;
}
</style>
