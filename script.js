//Ilk olarak arrow up,arrow down ve w,s tuslarimiz ile asagi yukari hareketlerini saglayalim
let stickLeft = document.getElementById('stickLeft'); //sol ve sag cubuklarimizi sectik
let stickRight = document.getElementById('stickRight');

//Burada cubuklarimizin yuksekligi tarayici yuksekliginin yarisi kadar olmasini sagladik
stickLeft.style.top = window.innerHeight / 2 + 'px';
stickRight.style.top = window.innerHeight / 2 + 'px';

//top degiskeni
let ball = document.getElementById('ball');

ball.style.top = window.innerHeight / 2 + 'px';
ball.style.left = (window.innerWidth / 2) - (16 / 2) + 'px';

let ballTop = 0;
let ballLeft = 0;

//Puan alma olaylari icin
//Skore degeri tutmak icin

let scoreLeft = 0;
let scoreRight = 0;

//ornegin 'w' tusuna bastigimizda cubugumuzun 10px yukari kaymasini istiyoruz 
//fakat style.top +=10 dedigimizde artmayacaktir
//sebebi ise; bizim cubugumuzun top degeri su anda integer cinsinde degil
//bu durumu degistirmek icin bir fonksiyon  kullanacagiz
function pxAdd(numb) {
    return numb + 'px';
}


//oyuncularin tuslara bastiginda islem gerceklesebilmesi ivcin onkeydown methodunu kullanacagiz

//Klavyemizde tikladigimiz her bir tus kod uretir. onkeydown ile bu kodlari gorebiliriz
//uretilen kod 'w' tusu ile esitse cubuk yukari dogru hareket edecek

//https://keycode.info/ sitesinden keycodelari gorebiliriz

document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 87:
            console.log('w tusuna basildi');
            //su anda hareketi sagladik ancak cubuklar tarayici kapsaminda kalmiyor 
            //Bunu engellemek icin bir karar yapisi kullanacagiz
            if (parseInt(stickLeft.style.top) <= 0) {
                stickLeft.style.top = stickLeft.style.top;
            } else {
                //pxadd fonksiyonunu burada kullanacagiz
                stickLeft.style.top = pxAdd(parseInt(stickLeft.style.top) - 30);
            }
            break;
        case 83:
            console.log('s tusuna basildi');
            if (parseInt(stickLeft.style.top) + 105 /* cubuk uzunlugu(85) + 30 alta kaymamasi icin*/ >= window.innerHeight) {
                stickLeft.style.top = stickLeft.style.top;
            } else {
                stickLeft.style.top = pxAdd(parseInt(stickLeft.style.top) + 30);
            }
            break;
        case 38:
            console.log('Yukari ok tusuna basildi');
            if (parseInt(stickRight.style.top) <= 0) {
                stickRight.style.top = stickRight.style.top;
            } else {
                stickRight.style.top = pxAdd(parseInt(stickRight.style.top) - 30);
            }
            break;
        case 40:
            console.log('asagi ok tusuna basildi');
            if (parseInt(stickRight.style.top) + 105 /* cubuk uzunlugu*/ >= window.innerHeight) {
                stickRight.style.top = stickRight.style.top;
            } else {
                stickRight.style.top = pxAdd(parseInt(stickRight.style.top) + 30);
            }
            break;
        default:
    }
}

window.addEventListener('click', gameChain);

// Oyunun surekli devam etmesi icin
function gameLoop() {
    // topun alacagi degerler
    ball.style.top = pxAdd(parseInt(ball.style.top) + ballTop);
    ball.style.left = pxAdd(parseInt(ball.style.left) + ballLeft);

    // top üst ve alt bloklara çarparsa, X ekseninde geri seksin
    if (parseInt(ball.style.top) <= 1 || parseInt(ball.style.top) + 18 >= window.innerHeight-5) {
        ballTop *= -1;
    }

    // top sağ ve sol çubuklara çarparsa, Y ekseninde geri seksin
    if (parseInt(ball.style.left) <= 18 && parseInt(ball.style.top) >= parseInt(stickLeft.style.top) && parseInt(ball.style.top) <= parseInt(stickLeft.style.top) + 87) {
        ballLeft *= -1;
    } else if (parseInt(ball.style.left) + 18 >= window.innerWidth - 11 && parseInt(ball.style.top) >= parseInt(stickRight.style.top) && parseInt(ball.style.top) <= parseInt(stickRight.style.top) + 87) {
        ballLeft *= -1;
    }

    //#ball elementinin hareketi sırasında 
    // left konumu 0 veya 0'dan küçük değere ulaşırsa, sağdaki oyuncu puan kazanır.

    if (parseInt(ball.style.left) <= 0) {
        if (++scoreRight === 5) {
            alert('2. oyuncu kazandı.');
            scoreRight = 0;
            scoreLeft = 0;
            document.getElementById('scoreLeft').innerHTML = scoreLeft;
        }
        document.getElementById('scoreRight').innerHTML = scoreRight;
        gameChain();
    }

    if (parseInt(ball.style.left) + 16 >= window.innerWidth) {
        if (++scoreLeft === 5) {
            alert('1. oyuncu kazandı.');
            scoreRight = 0;
            scoreLeft = 0;
            document.getElementById('scoreRight').innerHTML = scoreRight;
        }
        document.getElementById('scoreLeft').innerHTML = scoreLeft;
        gameChain();
    }


}

//Asagidaki fonksyion min(dahil) - max(haric) random sayi uretme fonksiyonudur 
function random(min, max) {
    return Math.random() * (max - min) + min;
}

//bir taraf gol attiginda oyunun yeniden baslamasi lazim
//bu sebepten dolayi topu baslangic noktasina goturuz

function gameChain() {
    ball.style.top = window.innerHeight / 2 + 'px';
    ball.style.left = (window.innerWidth / 2) - (16 / 2) + 'px';

    var rnd = random(6, 9); //6 ile 9 arasinda sayi urettik bu da topumuzun hizi
    //topun hangi yonde baslama olasiligi
    if (Math.random() * 1 > 0.5) {
        rnd *= -1;
    }

    ballLeft = rnd;
    ballTop = rnd;
}


setInterval(gameLoop, 20);