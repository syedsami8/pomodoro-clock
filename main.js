$(document).ready(function () {

    /*
    TODO:
    1) disable counter when clock running and enable when its paused
    2) fix timer after one cycl3 tldr fix restart
    3) optimize for mobile
    4) add mute button
    
    optional:
    + night mode
    */

    var timer = 1;
    var isPaused = true;
    var alarm = new Audio("alarm.mp3");
    var hs = new Audio("hour.mp3");
    var minutes = 0,
        hours = 0,
        seconds = 00;

    //    console.log(sesVal);
    //    console.log(brkVal);
    var brkbool = true;
    var running = false;
    var bcount = 1;
    var scount = 1;
    $('.timer p').html(scount);
    $('.break').html(bcount);
    $('.session').html(scount);
    var sesVal = scount;
    var brkVal = bcount;
    var sesOff = sesVal - 1;
    var secOff = 60;
    var brkOff = brkVal - 1;
    var timerFlag = true; //
    var repeatFlag = false; //
    var isBrkOn = false; // to indicate the current timer light of break and is used for session vice versa

    function bupdate() {
        brkVal = bcount;
        brkOff = brkVal - 1;
        secOff = 60;
    }

    function supdate() {
        sesVal = scount;
        sesOff = sesVal - 1;
        secOff = 60;
    }

    function changeIndicatorLight() {
        if (!isBrkOn) {
            $('.sname').css('color', '#76FF03');
            $('.bname').css('color', 'white');
        } else {
            $('.bname').css('color', '#76FF03');
            $('.sname').css('color', 'white');
        }
    }

    function p() {
        //        console.log(isPaused);

        if (!isPaused) {
            if (secOff == 0 && sesOff == 0 && hours == 0) {
                alarm.play();

                //            $('.timer p').html("Time Up!");

                if (brkbool) {
                    secOff = 60;
                    sesOff = (brkVal % 60) - 1;
                    hours = Math.floor(brkVal / 60);
                    brkbool = false;
                    isBrkOn = true;
                    changeIndicatorLight();

                } else {
                    if (repeatFlag) {
                        secOff = 60;
                        sesOff = (sesVal % 60) - 1;
                        hours = Math.floor(sesVal / 60);
                        brkbool = true;
                        isBrkOn = false;
                        changeIndicatorLight();
                    } else {
                        $('.pnp').attr('src','playwhite.png');
                        $('.timer p').html('JOB DONE!<sub>Created by Syed Samiuddin</sub>');
                        alarm.play();
                        $('.sname').css('color', '#E53935');
                        $('.bname').css('color', '#E53935');
                        console.log("sesval : "+sesVal+", scount : "+scount+", hours : "+hours+", sesOff :"+sesOff);
                        console.log("brkval : "+brkVal+", bcount : "+bcount+", hours : "+hours+", brkOff : "+brkOff);
                        console.log("isPaused : "+isPaused);
                        isPaused = true;
                        secOff = 60;
                        clearInterval(timeVal);
                    }

                }

            } else if (sesOff == 0 && hours > 0 && secOff == 0) {
                hs.play();
                sesOff = 59;
                secOff = 60;
                hours--;
            } else if (secOff == 0) {
                secOff = 59;
                sesOff--;
                if (hours > 0) {
                    $('.timer p').html(('0' + hours).slice(-(hours.toString().length)) + ":" + ('0' + sesOff).slice(-2) + ":" + ('0' + secOff).slice(-2));
                } else {
                    $('.timer p').html(('0' + sesOff).slice(-2) + ":" + ('0' + secOff).slice(-2));
                }
            } else {
                secOff--;
                if (hours > 0) {
                    $('.timer p').html(('0' + hours).slice(-(hours.toString().length)) + ":" + ('0' + sesOff).slice(-2) + ":" + ('0' + secOff).slice(-2));
                } else {
                    $('.timer p').html(('0' + sesOff).slice(-2) + ":" + ('0' + secOff).slice(-2));
                }
            }

        } else {

        }


    }

    $('.pnp').click(function () {
        if (!isPaused) {
            $(this).attr('src', 'playwhite.png');

        } else {
            $(this).attr('src', 'pausewhite.png');
        }
        if (sesVal > 60) {
            hours = Math.floor(sesVal / 60);
            sesVal = sesVal % 60;
            sesOff = sesVal - 1;
        }

        console.log(hours + ":" + sesVal);

        if (running) {
            clearInterval(timeVal);
            running = false;
        }
        running = true;
        isPaused = !isPaused;
        console.log(isPaused);
        timeVal = setInterval(p, 1000);

    });

    $('.bminus').click(function () {
        if (bcount >= 2)
            bcount--;
        $('.timer p').html(bcount);

        $('.break').html(bcount);
        bupdate();
        //        console.log("break : " + brkVal);
    });

    $('.bplus').click(function () {
        bcount++;
        $('.timer p').html(bcount);

        $('.break').html(bcount);
        bupdate();
        //        console.log("break : " + brkVal);

    });
    $('.splus').click(function () {
        scount++;

        $('.timer p').html(scount);

        $('.session').html(scount);
        supdate();
        //        console.log("session : " + sesVal);

    });
    $('.sminus').click(function () {
        if (scount >= 2)
            scount--;
        $('.timer p').html(scount);

        $('.session').html(scount);
        supdate();
        //        console.log("session : " + sesVal);

    });


    var repclick = false;

    $('.rep').click(function () {
        if (!repclick) {
            $(this).attr('src', 'repeat.png');
        } else {
            $(this).attr('src', 'repwhite.png');
        }
        repclick = !repclick;
        repeatFlag = !repeatFlag;
        console.log(repeatFlag);
    });

});
