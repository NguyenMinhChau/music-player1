const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);

const PLAYER_KEY = 'Music player';
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const player = $('.player');
const btnPlay = $('.btn-toggle-play');
const cd = $('.cd');
const progress = $('#progress');
const btnPrev = $('.btn-prev');
const btnRepeat = $('.btn-repeat');
const btnNext = $('.btn-next');
const btnRandom = $('.btn-random');
const playlist = $('.playlist');

const app = {
    isRepeat: false,
    isRandom: false,
    isPlaying: false,
    currentIndex: 0,
    config: JSON.parse(localStorage.getItem(PLAYER_KEY)) || { },
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_KEY, JSON.stringify(this.config));
    },
    songs: [
        {
            name: 'Yoru ni kakeru',
            singer: 'YOASOBI',
            path: 'https://aredir.nixcdn.com/NhacCuaTui992/YoruNiKakeru-YOASOBI-6149490.mp3?st=68hnFhtGF6RukKDcDcW9Mw&e=1623132179',
            image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/16788ee5-3436-474a-84fd-6616063a1a9a/de2f4eq-bc67fa17-8dae-46a9-b85d-fe8082c34841.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE2Nzg4ZWU1LTM0MzYtNDc0YS04NGZkLTY2MTYwNjNhMWE5YVwvZGUyZjRlcS1iYzY3ZmExNy04ZGFlLTQ2YTktYjg1ZC1mZTgwODJjMzQ4NDEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.dABuqANeQEs6FBfslZHdG1lW_gDwzf61yqiSABROSx0',
            code: 'Yoru ni kakeru'
        },
        {
            name: 'Muộn rồi mà sao còn',
            singer: 'Sơn Tùng M-TP',
            path: 'https://aredir.nixcdn.com/Believe_Audio19/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3?st=w9AA-eyRI7yD_VYGfvVWeQ&e=1623141624',
            image: 'https://pbs.twimg.com/media/Ez5jRyVVgAQN6Kh.jpg',
            code: 'Muộn rồi mà sao còn'
        },
        {
            name: 'See You Again',
            singer: 'Charlie Puth ft Wiz Khalifa',
            path: 'https://aredir.nixcdn.com/NhacCuaTui894/SeeYouAgain-KurtSchneiderEppicAlexGoot-3888930.mp3?st=1q73myBS8FKr8Rx0snpMJw&e=1623144094',
            image: 'https://nghiennhac.com/wp-content/uploads/2020/09/see-you-again-0.jpg',
            code: 'See You Again'
        },

        {
            name: 'Symphony',
            singer: 'Clean Bandit',
            path: 'https://aredir.nixcdn.com/Sony_Audio37/Symphony-CleanBanditZaraLarsson-4822950.mp3?st=sPgJSXtRXYpT_rznXyez6g&e=1623144426',
            image: 'https://i.ytimg.com/vi/PIf9GvWaxQQ/maxresdefault.jpg',
        },
        {
            name: 'Waiting For Love',
            singer: 'Avicii',
            path: 'https://aredir.nixcdn.com/Unv_Audio45/WaitingForLove-Avicii-4203283.mp3?st=mXGv6kIqbxg_coAyUqzlnw&e=1623144462',
            image: 'https://i.ytimg.com/vi/Hmbm3G-Q444/maxresdefault.jpg',
        },
        {
            name: 'Alone',
            singer: 'Marshmello',
            path: 'https://aredir.nixcdn.com/NhacCuaTui927/Alone-Marshmello-4456939.mp3?st=RTsMC9tNcKEi8fd0iKtdaA&e=1623144502',
            image: 'https://i.ytimg.com/vi/UNB8F0ObA4g/maxresdefault.jpg',
        },
        {
            name: 'Something Just Like This',
            singer: 'The Chainsmokers & Coldplay',
            path: 'https://aredir.nixcdn.com/Sony_Audio39/SomethingJustLikeThis-TheChainsmokersColdplay-5337136.mp3?st=VQuH6VgNsPlBizbk-c7n3w&e=1623144556',
            image: 'https://avatar-ex-swe.nixcdn.com/song/2017/11/07/a/1/4/5/1510038809679_640.jpg',
        },
        {
            name: 'Sugar',
            singer: 'Maroon 5',
            path: 'https://aredir.nixcdn.com/Unv_Audio73/Sugar-Maroon5-3338455.mp3?st=3FUWEyikJePPeAuREUcw9g&e=1623144644',
            image: 'https://i.ytimg.com/vi/7vw84EkHOlY/maxresdefault.jpg',
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/a/9/e/e/a9ee81fdd1c2b569c1c9631e969ea0aa.jpg?fs=MTYzMDE1NzY2MTg1NHx3ZWJWNHw',
            code: 'ZncntZLmAibsgRDyHyFGZHtkXVmLXxShk',
            name: 'Rồi Tới Luôn',
            singer: 'Nal',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUOZWCUC/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/5/1/7/c/517ca58e0bb720d2e469e96259ef2bdd.jpg?fs=MTYzMDE1NzY2MTg1NHx3ZWJWNHw',
            code: 'knJGykZmlRspskstmyDHkHtkCBmLCcSXL',
            name: 'Sai Cách Yêu',
            singer: 'Lê Bảo Bình',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUOZE7EZ/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/d/2/6/1/d26117831a67fecf48f95c99823cecc6.jpg?fs=MTYzMDE1NzY2MTg1NHx3ZWJWNHw',
            code: 'kHcntLZHhCHapkCyHyFnLmTZCBHLCJAXk',
            name: 'Khuê Mộc Lang',
            singer: 'Hương Ly, Jombie',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUUECEIC/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/b/c/9/a/bc9a9feaff8fe7bda8bc67621b8c1312.jpg?fs=MTYzMDE1NzY2MTg1NXx3ZWJWNHw',
            code: 'ZGJHyZLHCvFgQxSyntbnkmtZhdmZXcShL',
            name: 'Em Hát Ai Nghe',
            singer: 'Orange',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUU8FEI8/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/7/8/8/5/7885c2ade26fc2dd33a2c33638f5f72a.jpg?fs=MTYzMDE1NzY2MTg1NXx3ZWJWNHw',
            code: 'ZHcHykkmWgkFHnBymtFnZGTLhdHZhJzhL',
            name: 'Em Hứa Thế Nào',
            singer: 'Như Việt, ACV',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUOF9D6O/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/7/9/c/0/79c0fe52e37b8bbe8d7134c028b13551.jpg?fs=MTYzMDE1NzY2MTg1NXx3ZWJWNHw',
            code: 'LGcGykknzXWNSJuyGyFGkmykhdHLCxzCk',
            name: 'Em Nào Có Tội',
            singer: 'Thương Võ, ACV',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUOI0CDI/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/1/e/3/f/1e3ff6ba201610e2d0991b74266d7379.jpg?fs=MTYzMDE1NzY2MTg1NXx3ZWJWNHw',
            code: 'knJGTkkmpCFFNRJTGyFnZnTZXdGZXclCZ',
            name: 'Chiều Đồng Quê',
            singer: 'H2K',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUOFC78E/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/f/e/0/9/fe09fb3583e525d9c5c3619f446baae7.jpg?fs=MTYzMDE1NzY2MTg1NXx3ZWJWNHw',
            code: 'kHxmyLZmhdvQshiyGtbHLmyZCdmZhxzCZ',
            name: 'Thú Tội',
            singer: 'Đạt G',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUUA8I89/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/e/9/3/d/e93da34adef7ef51f8d93dd43ee74368.jpg?fs=MTYzMDE1NzY2MTg1NXx3ZWJWNHw',
            code: 'kHJHtZLHsmHbNEzyntDHZHTLgdGLCJzXk',
            name: 'Phải Nên Bắt Đầu Từ Đâu',
            singer: 'Hoài Lâm',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUZUD6WA/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/e/2/3/f/e23ff2faaa64eebfc57e0acde247f0db.jpg?fs=MTYzMDE1NzY2MTg1NXx3ZWJWNHw',
            code: 'LnxnTZLHzkEHLRkymtFnZGtZhVmkCxzhk',
            name: 'có hẹn với thanh xuân',
            singer: 'MONSTAR',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUW9EB6F/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/4/2/1/8/421867a919958f9ed1297af009118747.jpg?fs=MTYzMDE1NzY2MTg1NXx3ZWJWNHw',
            code: 'kGJHtLkHbczksbxTntbmZmTkgdGZXJzgk',
            name: 'Sầu Tương Tư',
            singer: 'Nhật Phong',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUIZZ800/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/8/b/3/3/8b337aca4250fde26de3dfb1d6eca697.jpg?fs=MTYzMDE1NzY2MTg1NXx3ZWJWNHw',
            code: 'LHxHykGigLSLkzWyntbnLHyLCdmkCxzhL',
            name: 'Cô Đơn Dành Cho Ai',
            singer: 'Lee Ken, Nal',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZOAFI9D9/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/9/2/d/1/92d1087e7b366b4cf7d1539d37e5f610.jpg?fs=MTYzMDE1NzY2MTg1NXx3ZWJWNHw',
            code: 'LmcmTLLnbbCkpdFyGtFmkHTZgdGZXxShk',
            name: 'Bỏ Em Vào Balo',
            singer: 'Tân Trần, Freak D',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZU0C7D9C/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/9/e/f/1/9ef1a6784f9736d0102a5560483dd7a0.jpg?fs=MTYzMDE1NzY2MTg1NXx3ZWJWNHw',
            code: 'ZHcGyLZmgvddNkctHyDHLnykhVHkCxzCk',
            name: 'Chưa Từng Vì Nhau',
            singer: 'Karik, Vũ Phụng Tiên',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUU9I9F6/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/e/2/b/7/e2b77a0a5ede9764046294a20f767076.jpg?fs=MTYzMDE1NzY2MTg1NXx3ZWJWNHw',
            code: 'ZHxmtZkHvdECQivTGTbHZmtZgBmZCxzgL',
            name: 'Yêu Một Người Gian Dối',
            singer: 'Như Việt, Thương Võ, ACV',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZU0E8DO0/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/4/8/7/a/487a6e3ecdeaf5a3fba40174108098d4.jpg?fs=MTYzMDE1NzY2MTg1NXx3ZWJWNHw',
            code: 'LmJHTLLmhbLppcVtnyvnkHyLhdGLCcSgk',
            name: 'Dắt Mẹ Đi Khắp Thế Gian',
            singer: 'Chi Dân',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUU8DOIF/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/8/8/1/8/88186dc50283d484954a81d336c58fe8.jpg?fs=MTYzMDE1NzY2MTg1NXx3ZWJWNHw',
            code: 'ZnJHtZZmAWZFvWCtGtDHZGtLhVmZXxShL',
            name: 'Phải Giữ Em Thế Nào',
            singer: 'Mr. Siro',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUWEDZ80/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/a/9/4/d/a94d404a69d40e168ca844460c729aa5.jpg?fs=MTYzMDE1NzY2MTg1NXx3ZWJWNHw',
            code: 'LHJmtLZGkLpxcvcyGtDmZHykgBHkCczCk',
            name: 'Anh Thề Đấy',
            singer: 'Thanh Hưng',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZOFBAAWC/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/0/1/4/8/01489ff733fe577c0eea93c06ef3bead.jpg?fs=MTYzMDE1NzY2MTg1NXx3ZWJWNHw',
            code: 'LHxGtLLGzmGzdbdtmyFnLHtZhdHLCxlhk',
            name: 'Cô Đơn Dành Cho Ai (Lofi Version)',
            singer: 'Lee Ken, Nal',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUW7IZ6O/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/9/5/3/5/9535cf2a5ebf34f486a42392f70a0dec.jpg?fs=MTYzMDE1NzY2MTg1Nnx3ZWJWNHw',
            code: 'LHJnykLHCXCGidATHyvGLGykCdmLgxSXZ',
            name: 'Bao Giờ Anh Quên',
            singer: 'Anh Quân Idol',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUUF9EC6/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/d/8/0/1/d801670cd8ecdb89750bdbe8de198021.jpg?fs=MTYzMDE1NzY2MTg1Nnx3ZWJWNHw',
            code: 'LHJmTLGihLcnbNDynyDHLHyLhBHLXclhZ',
            name: 'Hạ Còn Vương Nắng',
            singer: 'DatKaa, Kido',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZOAFBWB0/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/e/1/1/f/e11fe0da669959f8dbe4c4d305b8324f.jpg?fs=MTYzMDE1NzY2MTg1Nnx3ZWJWNHw',
            code: 'LHcHykZHZQRbuAdyntDHkmyLCdmZhcAgk',
            name: 'Thương Thầm',
            singer: 'NB3 Hoài Bảo',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZU0WU9EF/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/0/d/e/0/0de0b18a91ceedd16bb42cc260210de3.jpg?fs=MTYzMDE1NzY2MTg1Nnx3ZWJWNHw',
            code: 'knxHyLLmknaSSWBTGyFnkHTkCdHZCJzCZ',
            name: 'Đổi Tình Đổi Áo Đổi Anh',
            singer: 'Nguyễn Thành Đạt',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZOFA609Z/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/9/6/7/5/9675faf09a3f6cc4e78b45c170bccd6c.jpg?fs=MTYzMDE1NzY2MTg1Nnx3ZWJWNHw',
            code: 'kmJHykkmQRCmdQmtmtDHLHykhBmZhxzCk',
            name: 'Độ Tộc 2',
            singer: 'Độ Mixi, Phúc Du, Pháo, Masew',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUUUEEIE/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/7/c/0/a/7c0a59775515ddf9bc1b8a9a006d6b6d.jpg?fs=MTYzMDE1NzY2MTg1Nnx3ZWJWNHw',
            code: 'LHxHtLZGQpLcJmdyntFHkHtZgVGkXxSCL',
            name: 'Đổi Tình Đổi Áo',
            singer: 'Gia Huy Singer',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUOEOIZO/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/6/5/f/3/65f316face040eb499884719b9d2c214.jpg?fs=MTYzMDE1NzY2MTg1Nnx3ZWJWNHw',
            code: 'kHJmtZZHghhdJNmtntbGLHtLCdHLhcSCL',
            name: 'Khoan Thai',
            singer: 'Khải Đăng',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUUFAAOE/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/3/f/4/7/3f47b0c8cea593b6db4c3acade1bc498.jpg?fs=MTYzMDE1NzY2MTg1Nnx3ZWJWNHw',
            code: 'LmcmyLLHSLiBdipyGybmkHtkXdmkgxzhL',
            name: 'Hoàng Hoa Ký',
            singer: 'Long Nón Lá',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUW9F7FO/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/e/1/8/3/e18366f4c2ad897565185ea267444795.jpg?fs=MTYzMDE1NzY2MTg1Nnx3ZWJWNHw',
            code: 'kGxGyZLGghCDNxvyHyvHZnyZhdHkhJAhk',
            name: '3 1 0 7 3 (CuCak Remix)',
            singer: 'W/N, Duongg, Nâu, titie',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUUFAZFE/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/3/7/2/0/3720acfa5e78a4dc04b35413e5101e5a.jpg?fs=MTYzMDE1NzY2MTg1Nnx3ZWJWNHw',
            code: 'kHcGtkZnBkxLLEnyntvHZHtLhBGLCJzXk',
            name: 'Lỗi Tại Anh',
            singer: 'Alex Lam',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUIA8606/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/9/7/8/d/978d12830c18df95c26e93e658019166.jpg?fs=MTYzMDE1NzY2MTg1Nnx3ZWJWNHw',
            code: 'ZmxntkLGApHbmsETmybmkmtLXVmLhczhL',
            name: 'Phố Đã Lên Đèn (Masew Remix)',
            singer: 'Masew, Huyền Tâm Môn, Great',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUWEADBF/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/6/6/5/7/6657cb0713f758c68dc3b96f06bbf9d3.jpg?fs=MTYzMDE1NzY2MTg1Nnx3ZWJWNHw',
            code: 'kGxHyZkmzLFacQktHTvGkntkCBmZXxzCk',
            name: 'Con Đò Lỡ Hẹn (Lofi Version)',
            singer: 'H2K, Kunzing',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUW8F7EB/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/3/c/9/a/3c9a4bfc0eac279475dc08daa64441eb.jpg?fs=MTYzMDE1NzY2MTg1Nnx3ZWJWNHw',
            code: 'LGcmyZLmaHlsFcFtmTDHZHykCVnLhxzhL',
            name: 'Xin Cúi Đầu, Xin Biết Ơn',
            singer: 'Đạt G',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUZZ8OFW/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/8/d/8/5/8d85956b2a97c740699d9a56e3a240bd.jpg?fs=MTYzMDE1NzY2MTg1Nnx3ZWJWNHw',
            code: 'knxHyLZGWbmSclhyGyFHkmyLhdmZXxAgL',
            name: 'Hương Tình Thân (Hương Vị Tình Thân OST)',
            singer: 'Lâm Bảo Ngọc',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUO966EE/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/4/4/3/6/44360199ed16ab52d9ae8daf7aa75960.jpg?fs=MTYzMDE1NzY2MTg1Nnx3ZWJWNHw',
            code: 'ZmxmyLLmCEdkhclTGtDmkntZhdHkgcSXk',
            name: 'Mày Của Hôm Nay',
            singer: 'Kidz',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUZOC06U/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/0/c/f/7/0cf704c73a2eb790d69a0aa1434ee699.jpg?fs=MTYzMDE1NzY2MTg1N3x3ZWJWNHw',
            code: 'LmxmtkZmXWQcNpEtHyDmLmtkXdnZCcSCk',
            name: 'Yêu Ai Cũng Vậy Yêu Dùm Anh Đi',
            singer: 'Hồng Thanh',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUUE0FA7/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/1/5/4/6/15464365b9ceaaa3410de8ed722f518a.jpg?fs=MTYzMDE1NzY2MTg1N3x3ZWJWNHw',
            code: 'LmJmtLknZVvNvpktmyvmLmyLXdnkhxSCk',
            name: 'Sợ Ta Mất Nhau',
            singer: 'Châu Khải Phong, ACV',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZOFEOCIO/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/8/c/9/6/8c969b6c0ff48d261e4906f69a51bdba.jpg?fs=MTYzMDE1NzY2MTg1N3x3ZWJWNHw',
            code: 'LnxnTLZmCiRcSLJTntvGLmyLCdnLCcSXk',
            name: 'Cafe Đắng Và Mưa',
            singer: 'Minh Vương M4U, Hương Ly',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUZUCZIW/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/3/f/0/3/3f0398e6f0f9d9783b441fd1580e3dab.jpg?fs=MTYzMDE1NzY2MTg1N3x3ZWJWNHw',
            code: 'kmcGyknuiWQVvlmtnyFnkGtLgdmLhJAXk',
            name: 'Vách Ngọc Ngà (New Version)',
            singer: 'G5R Squad, Phan Ann',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZOEOWAZ8/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/3/b/c/c/3bcc9508a2f1b017534d08bc1a46a449.jpg?fs=MTYzMDE1NzY2MTg1N3x3ZWJWNHw',
            code: 'LHxmyZkHCNNhckRyGtDmLGykCdGLCcAXk',
            name: 'Yêu Thương Tan Vỡ',
            singer: 'Huy Vạc',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUZI6O7O/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/7/1/0/b/710b33e13a98b6943a7686243b50da33.jpg?fs=MTYzMDE1NzY2MTg1N3x3ZWJWNHw',
            code: 'ZmcmtZknhVBJmNZymyFHkGTLhBHZCJzCL',
            name: 'Ôm Em Lần Cuối',
            singer: 'NIT, Sing',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUUABI97/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/1/b/b/b/1bbb92a19f1acccbc5858393fef3af17.jpg?fs=MTYzMDE1NzY2MTg1N3x3ZWJWNHw',
            code: 'ZHJmykLmXQuSDdhyHtbHLmyZCdHLgclgZ',
            name: 'Quý Giá',
            singer: 'Đạt G',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUUE9AOC/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/0/9/f/4/09f43804093fcd6d6d473e2270a719d4.jpg?fs=MTYzMDE1NzY2MTg1N3x3ZWJWNHw',
            code: 'LmcHyLZGhnhlBshyHyvmkHtLCdmZhJzhL',
            name: 'Rồi Tới Luôn (Remix Version)',
            singer: 'Nal',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUU68U78/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/c/8/4/9/c8497a2b8f91e5ed5a06077fc8c078cf.jpg?fs=MTYzMDE1NzY2MTg1N3x3ZWJWNHw',
            code: 'kncHykkngacpHxLyHTbmLHyZCdnkhczXk',
            name: 'Thức Giấc (CuCak Remix)',
            singer: 'Da LAB',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUZI8OB9/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/2/8/9/5/2895d9b833489a535f5c35b5114fd170.jpg?fs=MTYzMDE1NzY2MTg1N3x3ZWJWNHw',
            code: 'LmxmyZkGbbQpGdbyHyvGLGyLgBHkCJlhk',
            name: 'Khi Thế Giới Đó Mất Đi (Gala Nhạc Việt)',
            singer: 'Tăng Phúc, Hương Ly',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZU0C6UO8/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/1/4/c/c/14cccc3b14e60ee4d49de232743bf62e.jpg?fs=MTYzMDE1NzY2MTg1N3x3ZWJWNHw',
            code: 'LGxHTkLmQgsJZbuyHybGkGtLhBnkCJSXL',
            name: 'Muôn Kiếp Vấn Vương',
            singer: 'K-ICM, RYO',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUU09FBI/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/9/3/b/d/93bdae6f46a032e1345263c1963c8865.jpg?fs=MTYzMDE1NzY2MTg1N3x3ZWJWNHw',
            code: 'ZncmykZGdhQncWmymTbmZnyLXVnZhJAXk',
            name: 'STAY',
            singer: 'The Kid LAROI, Justin Bieber',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUWIB0AW/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/0/a/3/3/0a3369d62f70542728845dfe90758146.jpg?fs=MTYzMDE1NzY2MTg1N3x3ZWJWNHw',
            code: 'LHJntLkmWhkplWuyHtbmLHyZhdHkhcShk',
            name: 'Ngã Đau',
            singer: 'Thiên Tú',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUOFAAEO/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/d/9/e/9/d9e901750b0205d7fd0cbc8bd87aea85.jpg?fs=MTYzMDE1NzY2MTg1N3x3ZWJWNHw',
            code: 'kGxnyLLHnaNHWSdyntDGkmykhdmZgxlgL',
            name: 'Sắp 30',
            singer: 'Trịnh Đình Quang',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZOFZBD6F/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/6/e/0/c/6e0cd858976bcc029faafc731cdceb28.jpg?fs=MTYzMDE1NzY2MTg1N3x3ZWJWNHw',
            code: 'knJntkkHCaCcJZWtHyFHkmyLhVGkCxSgL',
            name: 'Từ Khi Anh Ghé Qua',
            singer: 'K-ICM',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUZIUUWF/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/6/4/1/d/641d68d59142f6d62ba5d87e79f052da.jpg?fs=MTYzMDE1NzY2MTg1N3x3ZWJWNHw',
            code: 'LGJHtkkHhBBDmbATmyFnZGykgdnkhcSXL',
            name: 'Tận Cùng Cô Đơn',
            singer: 'Nguyễn Đình Vũ',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUUA99F8/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/a/a/1/a/aa1aa9276ddda9f826aca495038b06db.jpg?fs=MTYzMDE1NzY2MTg1N3x3ZWJWNHw',
            code: 'LmJnyLLGlkipgxzynyFmZmyLXdGZXJzgL',
            name: 'Kẻ Theo Đuổi Ánh Sáng',
            singer: 'Huy Vạc',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUWA00EU/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/d/1/4/5/d1454e79a8758e00d7c2452d4d794af9.jpg?fs=MTYzMDE1NzY2MTg1OHx3ZWJWNHw',
            code: 'kGcGykLHCBDCpLHtHtDmLHtZXdmkCxzhL',
            name: 'Tình Xa Lúc Ban Chiều',
            singer: 'K-ICM',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUUA8U6E/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/f/d/0/c/fd0c43ad1d2c2eb3b1e77e4c726bdac2.jpg?fs=MTYzMDE1NzY2MTg1OHx3ZWJWNHw',
            code: 'LGJmyLLGZXVhvWWtmtbmLmyLCBHZgxAXZ',
            name: 'Lựa Chọn Của Anh',
            singer: 'Thương Võ, ACV',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZU0WFOIF/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/0/9/3/8/09384dd774ed59af7469e8a43df3adab.jpg?fs=MTYzMDE1NzY2MTg1OHx3ZWJWNHw',
            code: 'kGJHTkZmpNumbFWyGyvmkmyZXdmLXxSCk',
            name: 'Cớ Sao Em Buồn',
            singer: 'Nguyễn Trọng Tài',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUUWZZ9I/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/b/5/7/7/b577c7ec5d9c7edb9935c93c9985d3d0.jpg?fs=MTYzMDE1NzY2MTg1OHx3ZWJWNHw',
            code: 'kHJnyZLHphkpkahymybmLHTkXdHLhJzgL',
            name: 'Đau Là Còn Thương',
            singer: 'Võ Kiều Vân',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUOFA9C8/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/a/f/6/6/af669f1450c6addd87a437e3f001b5aa.jpg?fs=MTYzMDE1NzY2MTg1OHx3ZWJWNHw',
            code: 'kmcHtZkHdRAuWdmyGyDnLmtZhBHLgxzhL',
            name: 'Chim Quý Trong Lồng',
            singer: 'K-ICM, Văn Mai Hương',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUW6OFZA/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/c/a/4/f/ca4f788bb9126137e1a302130a4edbb4.jpg?fs=MTYzMDE1NzY2MTg1OHx3ZWJWNHw',
            code: 'knxnyLLHpLkdQbbymtbHkmTZCVHZhxzhL',
            name: 'Tình Đơn Phương',
            singer: 'Nguyên., KOO',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUO80WOW/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/e/0/2/4/e024a8ef47798c4a86309494be03c2b1.jpg?fs=MTYzMDE1NzY2MTg1OHx3ZWJWNHw',
            code: 'ZHxmykkHSHNvckBtnybHZmyZCBGkhxzCk',
            name: 'Mất Nhau Yên Bình',
            singer: 'Vũ Quốc Hải, Dick',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUW8W0ED/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/3/0/9/c/309cba39c974f227e179ad655adcecf1.jpg?fs=MTYzMDE1NzY2MTg1OHx3ZWJWNHw',
            code: 'LHcGtZZmgBvalxLtmyFHkmtLhdHZXxzhZ',
            name: 'Trùng Dương',
            singer: 'Long Nón Lá, KayDee',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUUA88O9/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/6/d/2/b/6d2bd4d06412d8d0874b35b4dad12874.jpg?fs=MTYzMDE1NzY2MTg1OHx3ZWJWNHw',
            code: 'ZmxmyZZGDVkGAZWymtbGLHykhVnLCczXk',
            name: 'Xe Anh Đến Đâu Em Theo Đến Đó',
            singer: 'Dương Hoàng Yến, Đạt G',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZU0DOC8F/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/5/2/c/a/52ca75e7aa937df8c3559dfd00585fbd.jpg?fs=MTYzMDE1NzY2MTg1OHx3ZWJWNHw',
            code: 'ZmxmtZLGzELElBWynyDHkGykCdmZXJSCk',
            name: 'Kiêu (骁)/ Xiao',
            singer: 'Tỉnh Lung (Jing Long)',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUOZ0C0B/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/5/d/1/e/5d1eca1c4e55ec1e3db64ce29c58e2a5.jpg?fs=MTYzMDE1NzY2MTg1OHx3ZWJWNHw',
            code: 'ZHxHykmiidHsEHZtmtvmLHyZhVmLgclhk',
            name: 'Lệ Duyên Tình',
            singer: 'K-ICM, Long Nón Lá',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZODF6BFD/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/1/f/1/a/1f1ab8428a983f8a7700bfaa5591713b.jpg?fs=MTYzMDE1NzY2MTg1OHx3ZWJWNHw',
            code: 'LmcHtLmuXmmvVWgtGTFmZmtLCdmZhcSCZ',
            name: 'Chỉ Là Không Cùng Nhau (Live Version)',
            singer: 'Tăng Phúc, Trương Thảo Nhi',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZOACFBBU/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/6/0/a/e/60ae4c9a54bf8800e89aa7339cff584c.jpg?fs=MTYzMDE1NzY2MTg1OHx3ZWJWNHw',
            code: 'kHxmTZknhsCCGDGTnyDGkGyLCBmLCczhZ',
            name: 'Một Thuở Yêu Người',
            singer: 'Vicky Nhung',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUZIO9UU/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/b/3/1/4/b314bf8ef523cf1ad124ffd482462cc8.jpg?fs=MTYzMDE1NzY2MTg1OHx3ZWJWNHw',
            code: 'kHxHtLLnFkDpmdptGybHkmyZgdGkXxzhL',
            name: 'Em Có Yêu Anh Không?',
            singer: 'Anh Quân Idol',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZU0A686B/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/d/e/2/d/de2d2cabc7953d07fad3d7ada7789f72.jpg?fs=MTYzMDE1NzY2MTg1OHx3ZWJWNHw',
            code: 'kmcHyZkmgXpRHWCtnyvmkmtZXdmZXxSXL',
            name: 'Tĩnh Lặng',
            singer: 'Chi Dân',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUUF9770/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/3/9/8/6/3986cf2e778348cb9b514f1787b10e77.jpg?fs=MTYzMDE1NzY2MTg1OXx3ZWJWNHw',
            code: 'kmJntZLmhWlHzRLtmTFnLmtkhBHkhJShk',
            name: 'Gần Anh Hơn',
            singer: 'Đức Hati',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUUDC8UB/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/7/e/9/4/7e94b95743998a108ff33beed5bae5c3.jpg?fs=MTYzMDE1NzY2MTg1OXx3ZWJWNHw',
            code: 'LGxHtLZmBkkCiNptHtbHLmyZhBHkgxSXL',
            name: 'Lần Hẹn Hò Đầu Tiên',
            singer: 'Huyền Tâm Môn',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUI98BWF/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/6/7/0/c/670c0d435480b2eee62974f9ae984be9.jpg?fs=MTYzMDE1NzY2MTg1OXx3ZWJWNHw',
            code: 'LHxHyZLHlSFBssvymyFnZGtZCdHLgczXk',
            name: 'Lý Do... Anh Bỏ Em Vào Balo',
            singer: 'Tân Trần',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUWD7BDC/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/c/a/a/3/caa33fde7c86c0d0fc8842593b059f30.jpg?fs=MTYzMDE1NzY2MTg1OXx3ZWJWNHw',
            code: 'kHxmtZLmCaCBsuFTGyDGkHtkhBHZXcSCL',
            name: 'Hôm Nay Em Đẹp Lắm',
            singer: 'Tường Quân, TQE',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUZIO090/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/e/c/8/0/ec8080f5846156051f22d90959d4ff12.jpg?fs=MTYzMDE1NzY2MTg1OXx3ZWJWNHw',
            code: 'ZnJnykLHpzQxWLxTHybmkGtkhBHkhJlCk',
            name: 'DUMB DUMB',
            singer: 'SOMI',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUODUZD6/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/e/d/6/7/ed673addb1b454bf4a37a9d344690617.jpg?fs=MTYzMDE1NzY2MTg1OXx3ZWJWNHw',
            code: 'ZnxHyZZGlRZxzNHyHTbnLGtLCdGLXclCL',
            name: 'Em Sẽ Chờ',
            singer: 'Thảo Wendy',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUOZ08U6/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/c/2/b/8/c2b84561d1a4ad568c9a3ed870d2049d.jpg?fs=MTYzMDE1NzY2MTg1OXx3ZWJWNHw',
            code: 'kHxmTLZmLWVhdLxtHtbGZGyZXBHkXczhk',
            name: 'Anh Sẽ Để Em Đi',
            singer: 'Kidz',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZU0I6CBE/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/e/9/a/4/e9a49ec8996eb8208994810831eca730.jpg?fs=MTYzMDE1NzY2MTg1OXx3ZWJWNHw',
            code: 'LGxGyLLHSlnhNxdtHyDHkmykhBmkhczhL',
            name: 'Buông Tay Nhau Đi',
            singer: 'Thảo Wendy',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUWDO97F/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/4/b/f/e/4bfe459ca565c3c6853bf3c98af481c7.jpg?fs=MTYzMDE1NzY2MTg1OXx3ZWJWNHw',
            code: 'LmJHykkGpRszbaLTmyvGLmtLCdmLXclCk',
            name: 'Xem Như Anh Chẳng May',
            singer: 'Trung Ngon, COCC',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUUZWU7F/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/f/0/c/9/f0c99531e8144c38740bbb9417279fa7.jpg?fs=MTYzMDE1NzY2MTg1OXx3ZWJWNHw',
            code: 'ZmcmtLZnzmaFkzxtmybnkmtLgVGLXcAgL',
            name: 'Cố Gắng Vô Hình',
            singer: 'Văn Võ Ngọc Nhân, Vương Anh Tú',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUW8IEZU/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/f/a/1/6/fa164a95ff18192a620942312675729a.jpg?fs=MTYzMDE1NzY2MTg1OXx3ZWJWNHw',
            code: 'kmJmykknbvHisJzyHyFHLntZhdHZhxSgZ',
            name: 'Tình Yêu Ngủ Quên',
            singer: 'Hoàng Tôn, LyHan',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZU0BBO78/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/9/2/c/f/92cf9533fadd58123f71a4ae5bf3a962.jpg?fs=MTYzMDE1NzY2MTg1OXx3ZWJWNHw',
            code: 'ZmcGtLkHphxZLHByntvmZHTkXdmLCxzgZ',
            name: 'Ta Nợ Nhau Một Đời Hạnh Phúc',
            singer: 'Đông Đặng',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUU0ABUF/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/e/0/2/c/e02cd4e0a723ed9b3510a95b5f6dbdd7.jpg?fs=MTYzMDE1NzY2MTg2MHx3ZWJWNHw',
            code: 'kHxGyZZHbRCkCNgyHtbmkHyZgBmZXczgL',
            name: 'Tay To',
            singer: 'Rapital, MCK, RPT PhongKhin',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUI7WC8C/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/9/9/8/d/998dd7d002f3b4adb4cbccfcd76adffe.jpg?fs=MTYzMDE1NzY2MTg2MHx3ZWJWNHw',
            code: 'kHxHtZknzmhEzvzyGtvHLmyZhBGkhcACL',
            name: 'Cảm Ơn Anh',
            singer: 'Hoàng Yến Chibi',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUW8IOB0/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/b/8/3/8/b8389a82a4e42b79e48f676a5e04e924.jpg?fs=MTYzMDE1NzY2MTg2MHx3ZWJWNHw',
            code: 'LHxHykkHzgWcRBvynyFnkHTZhBnZgxACk',
            name: 'Ngựa Ô Duyên Tình',
            singer: 'Phạm Sắc Lệnh, Jiren K',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUOIIW7U/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/5/6/9/b/569bdeb4071723d8a8ea4ac4ad1700ff.jpg?fs=MTYzMDE1NzY2MTg2MHx3ZWJWNHw',
            code: 'ZnxmyLkmnJdJacmtGyFnLHyLXdnLCJlCZ',
            name: 'Ngân Lang',
            singer: 'G5R Squad',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZOF6C7FC/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/e/a/1/a/ea1a0f537f0673fb1356a1ea58609d35.jpg?fs=MTYzMDE1NzY2MTg2MHx3ZWJWNHw',
            code: 'ZmcntLkGzhgHzXzyGyFHkntkgVmLCxSgk',
            name: 'Ai Mà Muốn Mình Cô Đơn Đâu',
            singer: 'Kidz',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUOII870/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/avatars/2/b/6/2/2b62681eb5f225949b1a3f2ed54c837f.jpg?fs=MTYzMDE1NzY2MTg2MHx3ZWJWNHw',
            code: 'ZHcntLknQaizCBptHtFnZHykCBmZCJzXL',
            name: 'Anh Có Thể Đừng Rời Xa Em Được Không',
            singer: 'Thiên Tú',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUUW66CB/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/5/5/b/6/55b611a08fb842bf2555388eb52d5263.jpg?fs=MTYzMDE1NzY2MTg2MHx3ZWJWNHw',
            code: 'LHxntZZHQsHbBZStmybGLnTkhdHZhxlXL',
            name: 'Sài Gòn Ơi!',
            singer: 'Châu Khải Phong, ACV',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUU0FEWA/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/b/7/b/5/b7b5b99e4aa374702ce8ee64858a9bbb.jpg?fs=MTYzMDE1NzY2MTg2MHx3ZWJWNHw',
            code: 'kHxmTZnEEQpscCETmtbHLHykhdnZhJlhL',
            name: 'Răng Khôn',
            singer: 'Phí Phương Anh, RIN9',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZOEOOC6D/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/d/b/6/b/db6bafcc05f04fbe408c6acc36b7dcfb.jpg?fs=MTYzMDE1NzY2MTg2MHx3ZWJWNHw',
            code: 'knJHTLZnXFFSmDmtmyDGLGykgVmkCJzCk',
            name: 'Sai Cách Yêu (Remix)',
            singer: 'Lê Bảo Bình',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUU8FUIU/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/a/8/b/2/a8b2a716b46b88659bd0c7e5ae749f1d.jpg?fs=MTYzMDE1NzY2MTg2MHx3ZWJWNHw',
            code: 'LmcmtLZmhGCAdaJyHtDnZHyZCdmLXxlXL',
            name: 'Xin Vẫy Tay Chào',
            singer: 'Lưu Ánh Loan',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUU68U7A/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/8/9/d/6/89d611f9e2d0298bf6e6458ecf451741.jpg?fs=MTYzMDE1NzY2MTg2MHx3ZWJWNHw',
            code: 'kmxmtLkmppZiVRmyGybHLnykCdHkhclgZ',
            name: 'Sau Ngày Mưa',
            singer: 'Quang Đăng Trần',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUOEOO9E/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/5/f/a/4/5fa4a1dc0db9be1b390b01bd9e42ce80.jpg?fs=MTYzMDE1NzY2MTg2MHx3ZWJWNHw',
            code: 'ZHcntZkGpWbCbCRyHtbGZHtkhVHkgclCk',
            name: 'Thì Thôi',
            singer: 'T-Passion, TVk',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUOEUE7D/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/c/4/3/a/c43a3f7cc98ee9c62401edb8fb999b74.jpg?fs=MTYzMDE1NzY2MTg2MHx3ZWJWNHw',
            code: 'kHcGtLHiuzbxDdJtmybHZmykCBnkXcSXk',
            name: 'Khi Em Lớn',
            singer: 'Orange, Hoàng Dũng',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZOEIUW0E/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/f/6/7/7/f677c471260b06f3961071f19b00f786.jpg?fs=MTYzMDE1NzY2MTg2MHx3ZWJWNHw',
            code: 'kHJmykkGgSZBBHpTHybHLHyLCdHLhxAhL',
            name: 'Giống Như Định Mệnh',
            singer: 'Nhật Kim Anh, Dương Hiếu Nghĩa',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUUBD779/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/1/2/9/c/129cb6b4f2a85ebb2b1d890ffd93f052.jpg?fs=MTYzMDE1NzY2MTg2MHx3ZWJWNHw',
            code: 'LHcHyZZnkVFWJLJtntbnkHTkCdmLXJSCk',
            name: 'Càng Lớn Càng Cô Đơn',
            singer: 'JayKii',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZOFEO67A/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/0/8/c/1/08c1b75c9d890bc527138226513fbf8e.jpg?fs=MTYzMDE1NzY2MTg2MHx3ZWJWNHw',
            code: 'ZHxmykkHbbhnadkTGtFnLmyZhdmLCcAgZ',
            name: 'Yếu Đuối Ai Xem',
            singer: 'JayKii',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZU0C7A7B/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/c/f/f/0/cff0875b2d4de5cf4931f3739ee69e7a.jpg?fs=MTYzMDE1NzY2MTg2MXx3ZWJWNHw',
            code: 'kGJHyZkHAlHcdmWTmyvHLGtLgdnZCclCZ',
            name: 'Đau Hơn Chữ Đau',
            singer: 'Phạm Nguyên Ngọc, B.',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUWDOF7I/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/1/d/8/4/1d8407fabf75d52119c68b60aee68685.jpg?fs=MTYzMDE1NzY2MTg2MXx3ZWJWNHw',
            code: 'LnxmtLLmlbWWLBpymtvGLGTkCVHkXxlhk',
            name: 'Có Ai Cho Tôi Hay',
            singer: 'Trịnh Thăng Bình, XAN',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUWAE9IF/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/e/6/c/8/e6c863e57e27561e8c3abb66b5b85818.jpg?fs=MTYzMDE1NzY2MTg2MXx3ZWJWNHw',
            code: 'kmcHyZLHdgRkvHntHtFHLntLhBmLXcShk',
            name: 'Ước Mơ Của Mẹ',
            singer: 'Vương Long',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUWWUEU0/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/9/1/a/c/91ac88e5cc2dc02264b0624b2ce25b9c.jpg?fs=MTYzMDE1NzY2MTg2MXx3ZWJWNHw',
            code: 'LGcHyZkmpXxFLBdyHyFmLnyZXdGLhJSCL',
            name: 'Chia Tay?',
            singer: 'Trung Tự',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUU0AFZZ/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/c/8/7/b/c87b071d6bcedee4dfb91ed28eaa24b9.jpg?fs=MTYzMDE1NzY2MTg2MXx3ZWJWNHw',
            code: 'LGxmykZGCCZnLWmTGyvmLHTZCBHLXxzCk',
            name: 'Tao Lo Cho Mày',
            singer: 'Pjnboys, TamKe',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUUED866/320'
        },
        {
            image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/3/4/1/b/341bcf486dac9f48837e17fecde775d6.jpg?fs=MTYzMDE1NzY2MTg2MXx3ZWJWNHw',
            code: 'kGxHtLZGSLdddRmTmyvnkmykCBmkCcACk',
            name: 'Một Khúc Sầu Vương',
            singer: 'Thiên Tú',
            path: 'http://api.mp3.zing.vn/api/streaming/audio/ZUW90D8E/320'
        }
    ],
    render: function () {
        const htmls = this.songs.map((item, index) => {
            return `        
        <div data-index="${index}" class="song ${index === this.currentIndex ? 'active' : ''
                }">
            <div
                class="thumb"
                style="
                background-image: url('${item.image}');
            "
            ></div>
            <div class="body">
                <h3 class="title">${item.name}</h3>
                <p class="author">${item.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>`;
        });
        playlist.innerHTML = htmls.join('');
    },
    handleEvents: function () {
        const _this = this;
        const cdWidth = cd.offsetWidth;

        //xử lý CD quay / dừng
        const cdThumbAnimate = cdThumb.animate(
            [
                {
                    transform: 'rotate(360deg)',
                },
            ],
            {
                duration: 10000,
                iterations: Infinity,
            }
        );
        cdThumbAnimate.pause();

        //xử lý phóng to / thu nhỏ
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCDwidth = cdWidth - scrollTop;
            cd.style.width = newCDwidth > 0 ? newCDwidth + 'px' : 0;
            cd.style.opacity = newCDwidth / cdWidth;
        };
        //xử lý khi click play
        btnPlay.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        };
        //xử lý khi nhấn next songs
        btnNext.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.nextSong();
            }
            _this.scrollToActiveSong();
            audio.play();
        };
        //xử lý khi nhấn pre songs
        btnPrev.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.preSong();
            }
            _this.scrollToActiveSong();
            audio.play();
        };
        //xử lý khi random
        btnRandom.onclick = function () {
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRandom', _this.isRandom);
            btnRandom.classList.toggle('active', _this.isRandom);
        };
        //xử lý khi repeat
        btnRepeat.onclick = function () {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat);
            btnRepeat.classList.toggle('active', _this.isRepeat);
        };
        // Khi bài hát được play
        audio.onplay = function () {
            _this.isPlaying = true;
            cdThumbAnimate.play();
            player.classList.add('playing');
        };
        // Khi bài hát bị pause
        audio.onpause = function () {
            _this.isPlaying = false;
            cdThumbAnimate.pause();
            player.classList.remove('playing');
        };
        // Bắt được tiến độ bài hát ở thanh progress khi play song
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercen = (audio.currentTime / audio.duration) * 100;
                progress.value = progressPercen;
            }
        };
        // Xử lý tua nhạc khi kéo thanh progress
        progress.onchange = function (e) {
            const seekTime = (audio.duration / 100) * e.target.value;
            audio.currentTime = seekTime;
        };
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play();
            } else {
                btnNext.click();
            }
        };
        //lắng nghe click hành vi click vào playlist
        playlist.onclick = function (e) {
            let songNode = e.target.closest('.song:not(.active)');
            if (songNode || e.target.closest('.option')) {
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    audio.play();
                }
                if (e.target.closest('.option')) {
                }
            }
        };
    },
    // Xử lý nút Random
    playRandomSong: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (this.currentIndex === newIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    // Chuyển đến bài hát tiếp theo
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex > this.songs.length - 1) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    // Trở về bài hát trước đó
    preSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    scrollToActiveSong: function () {
        setTimeout(() => {
            if (this.currentIndex <= 3) {
                $('.song.active').scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                });
            } else {
                $('.song.active').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }
        }, 300);
    },
    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },
    // Định nghĩa các thuộc tính cho object
    defineProperty: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            },
        });
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;

        if ($('.song.active')) {
            $('.song.active').classList.remove('active');
        }
        const list = $$('.song');
        list.forEach((song) => {
            if (Number(song.getAttribute('data-index')) === this.currentIndex) {
                song.classList.add('active');
            }
        });
    },
    start: function () {
        this.loadConfig();
        btnRandom.classList.toggle('active', this.isRandom);
        btnRepeat.classList.toggle('active', this.isRepeat);
        // Định nghĩa các thuộc tính cho object
        this.defineProperty();
        //Lắng nghe / xử lý sự kiện (DOM events)
        this.handleEvents();
        //Tải thông tin bài hát đầu tiên khi mới chạy ứng dụng
        this.loadCurrentSong();
        //Render playlist
        this.render();
    },
};
app.start();
