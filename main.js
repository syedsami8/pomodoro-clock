$(document).ready(function () {

    /*
    TODO:
    1) [done]--> disable counter(-1+) when clock running and enable when its paused 
    2) [done]--> fix break counter , its not udapting value i.e, retaining old value; 
    3) [done]--> fix timer after one cycl3 tldr; fix restart
    4) optimize for mobile
    5) add mute button

    optional:
    + night mode
    */

    var timer = 1,
        bcount = 5,
        scount = 25,
        bvalue = bcount,
        scount = scount,
        sesVal = scount,
        brkVal = bcount,
        sesOff = sesVal - 1,
        secOff = 60,
        brkOff = brkVal - 1,
        minutes = 0,
        hours = 0,
        seconds = 00;


    var isPaused = true,
        brkbool = true,
        running = false,
        timerFlag = true,
        repeatFlag = false, //
        isBrkOn = false, // to indicate the current timer light of break and is used for session vice versa
        isDisabled = false; // for counter controls , disabled or not


    var alarm = new Audio("alarm.mp3"),
        hs = new Audio("hour.mp3");



    //    console.log(sesVal);
    //    console.log(brkVal);


    $('.timer p').html(scount);
    $('.break').html(bcount);
    $('.session').html(scount);



    function bupdate() {
        bvalue = bcount;
        brkVal = bcount;
        if (isBrkOn) {
            sesVal = bcount;
            sesOff = sesVal - 1;
            secOff = 60;
        } else {
            brkVal = bcount;
            brkOff = brkVal - 1;
            secOff = 60;
        }
    }

    function supdate() {
        svalue = scount;
        sesVal = scount;
        sesOff = sesVal - 1;
        secOff = 60;
    }

    function changeIndicatorLight() {
        $('.bname').css('color', 'white');
        $('.sname').css('color', 'white');
        if (!isBrkOn) {
            $('.sname').css('color', '#76FF03');
            $('.bname').css('color', 'white');
        } else {
            $('.bname').css('color', '#76FF03');
            $('.sname').css('color', 'white');
        }
    }

    function changeDisabled() {
        if (isDisabled) {
            $('.bplus,.bminus,.splus,.sminus').css({
                'color': '#484848',
                'cursor': 'not-allowed'
            });
        } else {
            $('.bplus,.bminus,.splus,.sminus').css({
                'color': '#ddd',
                'cursor': 'pointer'
            });
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
                        $('.pnp').attr('src', 'playwhite.png');
                        //                        $('.timer p').append('<sub>Created by Syed Samiuddin</sub>');
                        alarm.play();
                        $('.sname').css('color', '#E53935');
                        $('.bname').css('color', '#E53935');
                        console.log("sesval : " + sesVal + ", scount : " + scount + ", hours : " + hours + ", sesOff :" + sesOff);
                        console.log("brkval : " + brkVal + ", bcount : " + bcount + ", hours : " + hours + ", brkOff : " + brkOff);
                        console.log("isPaused : " + isPaused);
                        isPaused = true;
                        isDisabled = false;
                        changeDisabled();
                        brkbool = true;
                        isBrkOn = false;
                        
                        secOff = 60;
                        bcount = bvalue;
                        scount = svalue;
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
        isDisabled = !isDisabled;
        changeDisabled();
        changeIndicatorLight();
        console.log("Paused : " + isPaused);
        console.log("isDisabled :" + isDisabled);
        timeVal = setInterval(p, 1000);

    });

    $('.bminus').click(function () {
        if (bcount >= 2 && !isDisabled) {
            bcount--;
            $('.timer p').html(bcount);
            $('.break').html(bcount);
            bupdate();
        }

        //        console.log("break : " + brkVal);
    });

    $('.bplus').click(function () {
        if (!isDisabled) {
            bcount++;
            $('.timer p').html(bcount);
            $('.break').html(bcount);
            bupdate();
        }

        //        console.log("break : " + brkVal);

    });
    $('.splus').click(function () {
        if (!isDisabled) {
            scount++;
            $('.timer p').html(scount);
            $('.session').html(scount);
            supdate();
        }


        //        console.log("session : " + sesVal);

    });
    $('.sminus').click(function () {
        if (scount >= 2 && !isDisabled) {
            scount--;
            $('.timer p').html(scount);
            $('.session').html(scount);
            supdate();
        }

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
        console.log("Repeat : " + repeatFlag);
    });

});
