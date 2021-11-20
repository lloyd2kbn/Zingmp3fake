var $=document.querySelector.bind(document);
var $$=document.querySelectorAll.bind(document);
const playlist= $(".body-right");
const musicName=$(".music-textname h5");
const singerName=$(".music-textname p");
const cdThumb=$(".music-image");
const audio=$("#audio");
const playBtn=$('.btn-toggle');
const footerCenter=$(".footer-center");
const currentImage=$(".body-left img");
const progress=$("#progress");
const prev=$(".btn-prev-song");
const next=$(".btn-next-song");
const randomBtn=$(".btn-random-song");
const repeatBtn=$(".btn-repeat-song");
const progressVolume=$("#volumn");
const duration=$(".duration-time");
const timeup=$(".current-time");
// list bài hát
const app={
    // Lấy bài hát đầu tiên
    currentIndex:0,
    isPlaying:false,
    isRandom:false,
    isRepeat:false,
    // Tất cả bài hát
    songs:[
        {
            name:"Anh Nhà Ở Đâu Thế",
            singer:"Amee",
            path:"./music/anhnhaodauthe.mp3",
            image:"./assest/imgMusic/anhnhaodauthe.png"
        },
        {
            name:"Big City Boy",
            singer:"Binz",
            path:"./music/bigcityboy.mp3",
            image:"./assest/imgMusic/bigcityboy.png"
        },
        {
            name:"BlackJack",
            singer:"Soobin & Binz",
            path:"./music/blackjack.mp3",
            image:"./assest/imgMusic/blackjack.png"
        },
        {
            name:"Chạy Ngay Đi",
            singer:"Sơn Tùng M-TP",
            path:"./music/chayngaydi.mp3",
            image:"./assest/imgMusic/chayngaydi.png"
        },
        {
            name:"Cưới Thôi",
            singer:"Masew & Bray",
            path:"./music/cuoithoi.mp3",
            image:"./assest/imgMusic/cuoithoi.png"
        },
        {
            name:"Dù Cho Mai Về Sau",
            singer:"Bùi Trường Linh",
            path:"./music/duchomaivesau.mp3",
            image:"./assest/imgMusic/duchomaivesau.png"
        },
        {
            name:"Muộn Rồi Mà Sao Còn",
            singer:"Sơn Tùng M-TP",
            path:"./music/muonroimasaocon.mp3",
            image:"./assest/imgMusic/muonroimasaocon.png"
        },
        {
            name:"My Sun",
            singer:"Phương Ly",
            path:"./music/mysun.mp3",
            image:"./assest/imgMusic/mysun.png"
        },
        {
            name:"Phi Hành Gia",
            singer:"Lil Wyun",
            path:"./music/phihanhgia.mp3",
            image:"./assest/imgMusic/phihanhgia.png"
        },
        {
            name:"Sài Gòn Đâu Có Lạnh",
            singer:"Changg",
            path:"./music/saigondaucolanh.mp3",
            image:"./assest/imgMusic/saigondaucolanh.png"
        }
      
    
    ],
    // định nghĩa thuộc tính
    defineProperties(){
       Object.defineProperty(this,"currentSong",{
         get(){
             return this.songs[this.currentIndex]
         }
       })
    },
    // Render Giao diện
    render(){
        const  __this=this;
      var htmls= this.songs.map(function(song,index){
            return `
            <div class="box-musicplay ${index==__this.currentIndex? 'box-musicplay--active' : ''}" data-index="${index}">
                <div class="info-musicplay">
                  <div class="infor-detail-music">
                     <img src="${song.image}" alt="" class="image-music">
                     <div class="infor-singer-name">
                        <div class="music-name">${song.name}</div>
                        <div class="singer-name">${song.singer}</div>
                     </div>    
                  </div>    
                <div class="duration"><p>3:45</p></div>
            </div>
            <div class="btn-musicplay">
               <i class="fas fa-microphone"></i>
               <i class="fas fa-heart"></i>
               <i class="fas fa-ellipsis-h"></i>
            </div>
         </div>

            `
        }) ;
        playlist.innerHTML=htmls.join('');
    },
    handleEvent(){
        const _this=this;
        // Xử lí CD quay và dừng
        const cdThumbAnimate=cdThumb.animate([
            {transform:"rotate(360deg)" }
        ],{
            duration:10000,
            iterations:Infinity
        });
        cdThumbAnimate.pause()
        // xu li khi click play and pause
        playBtn.onclick=function(){
               if(_this.isPlaying){
                audio.pause();
               }else{
                audio.play();
                
               }      
        }
             //    khi song dc play
             audio.onplay=function(){
                _this.isPlaying=true;
                footerCenter.classList.add("playing");
                cdThumbAnimate.play();
            }
            // khi song bi huy
            audio.onpause=function(){
                _this.isPlaying=false;
                footerCenter.classList.remove("playing");
                cdThumbAnimate.pause()
            }  
           // ontime update (khi tiến độ bài hát thay đổi)
           audio.ontimeupdate=function(){    
              if(audio.duration){
                const progressPercent=Math.floor(audio.currentTime/audio.duration*100);
                progress.value=progressPercent;  
                var timene=_this.formatSecond(Math.floor(audio.currentTime))
                timeup.innerHTML=timene;
               
               
              }        
           }

           //xu li khi tua song
           progress.onchange=function(){
               const seekTime=(audio.duration*progress.value/100);
               audio.currentTime=seekTime;
              
           }
        //    xu li khi next bai
            next.onclick=function(){
                
                _this.nextSong();
                audio.play();
                _this.render();
            }
        //  xu li kh prev bài
            prev.onclick=function(){
                _this.prevSong();
                audio.play();
                _this.render();
            }
        // xu li khi random
            randomBtn.onclick=function(){           
                    _this.isRandom=!_this.isRandom;
                    randomBtn.classList.toggle("active",_this.isRandom);           
            }
        //xu li khi repeat
            repeatBtn.onclick=function(){
                _this.isRepeat=!_this.isRepeat;
                repeatBtn.classList.toggle("active",_this.isRepeat);   
            }
        //Lang nghe hanh vi click vao playlist
        playlist.onclick=function(e){
            const songNode=e.target.closest(".box-musicplay:not(.box-musicplay--active)")
            // xu li khi click vao song
                    if(songNode){
                        _this.currentIndex=songNode.dataset.index;
                        _this.loadCurrentSong();
                        audio.play();
                        _this.render();
                    }
  
        } 
        // xu li volumne
        progressVolume.onchange=function(){
            var currentVolumne=progressVolume.value*1/100;
            audio.volume=currentVolumne;
            
        }
    //    xu li time duration
    audio.onloadedmetadata=function(){
        var date = new Date(null);
        var second=Math.floor(audio.duration);
        date.setSeconds(second); 
        var result = date.toISOString().substr(11, 8);
        duration.innerHTML=result;
    }

         
    },
    loadCurrentSong(){
        // 
        musicName.innerHTML=this.currentSong.name;
        singerName.innerHTML=this.currentSong.singer;
        cdThumb.style.backgroundImage=`url("${this.currentSong.image}")`;
        audio.src=this.currentSong.path;
        // current image
        currentImage.src=this.currentSong.image;
        // duration
        
    
        
        
        
    },
    // lùi lại một bài hát
    prevSong (){
        this.currentIndex--;
        if(this.currentIndex<0){
                this.currentIndex=this.songs.length-1;
        }
        this.loadCurrentSong();

    },
    // thực hiện bài hát kế tiếp
    nextSong(){
       
        if(this.isRepeat){
            // repeatsong
            this.loadCurrentSong();
        }else if(this.isRandom){
            // radom song
            this.playRandomSong();
        }else{
                // load bài mới
            this.currentIndex++;
            if(this.currentIndex===this.songs.length){
                    this.currentIndex=0;
            }
            this.loadCurrentSong();

        }
       

    },
    playRandomSong(){
        let newIndex;
            do{
                newIndex=Math.floor(Math.random()*this.songs.length);
            }while(this.currentIndex===newIndex);
          this.currentIndex=newIndex;
          this.loadCurrentSong();
    },
    formatSecond(second){
        const minutes=Math.floor(second/60);
        const seconds=Math.floor(second%60);
        return "00"+":"+"0"+minutes+":"+seconds;
    },
    start(){
        // định nghĩa ra các thuộc tính
        this.defineProperties();
        // Lằng nghe xử lí các sự kiện
        this.handleEvent();
        //Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong();
        // render ra giao diện
        this.render();
    }


};
// Chạy phương thức start
app.start();
// 