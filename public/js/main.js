var validationFlag = true;
$(function(){ 
	$("#wizard").steps({
        headerTag: "h4",
        bodyTag: "section",
        enablePagination: true,
        transitionEffect: "fade",
        onStepChanged: function (event, currentIndex, newIndex){
            // $("html, body").animate({ scrollTop: 0 }, "slow");
            event.preventDefault();
            $(window).scrollTop(0);
            console.log("scroll Done");
            // return false;
        },
        onFinishing:()=>{
            validateInput();
            if(validationFlag){
                        // Validate and Submit data 
                let checkState = $('.agree-checkbox-check').is( ":checked" );
                console.log(checkState);
                if(checkState){
                    // Will do some validation logi\c here
               $('#add-form-data').submit();
                }else if(!checkState){
                    alert('Please Read Warnning Message And Check "I Agree" Box To Sbmit Form');
                }

            }else{
                alert("Please Fill all required Data");
                validationFlag = true;
            }
        },
        enableAllSteps: true,
        transitionEffectSpeed: 200,
        onStepChanging: function (event, currentIndex, newIndex) { 
            if ( newIndex >= 1 ) {
                $('.actions ul').addClass('actions-next');
            } else {
                $('.actions ul').removeClass('actions-next');
            }
            return true; 
        },
        labels: {
            finish: "Submit",
            next: "Continue",
            previous: "Back"
        }
    });


    $(document).on('change', '.acadmic-table' , function(){
        let data = $('.acadmic-table').val();
        console.log(data);
    })


    // Custom Steps 
    $('.wizard > .steps li a').click(function(){
    	$(this).parent().addClass('checked');
		$(this).parent().prevAll().addClass('checked');
		$(this).parent().nextAll().removeClass('checked');
    });
    // Custom Button Jquery Step
    $('.forward').click(function(){
    	$("#wizard").steps('next');
    });
    $('.backward').click(function(){
        $("#wizard").steps('previous');
    });
    // Input Focus
    $('.form-holder').delegate("input", "focus", function(){
        $('.form-holder').removeClass("active");
        $(this).parent().addClass("active");
    });
});


// check if all required input fileds are filled properly
// will fire this function in "OnFinishing" fn
function validateInput() {
        $('.required').each(function (i, el) {
            var data = $(el).val();
            // console.log(i + ': ' + data);
            var len = data.length;
            if (len<1) {
                validationFlag = false;
                event.preventDefault();
                return;
            }
        })
    }

$('#opt-sub-1-MSC').hide();
$(document).on('change','#sel-class',function(){
    let subId = $('#sel-class').val();
    if(subId === "BSC" || subId === "BCS"){
        $('.optional-subjests').hide();
        
    }else if(subId === "MA" || subId === "BA" || subId === "MSC"){
        $('.optional-subjests').show();
        if(subId === "MA"){
            $('#opt-sub-1-MA').show();
            $('#opt-sub-1-MSC').hide();

        }else if(subId === "MSC"){
            $('#opt-sub-1-MA').hide();
            $('#opt-sub-1-MSC').show();
        }
    }
});



function checkImgDimensions(ImgSrc){
    var img = new Image();
    img.onload = function() {
        console.log(img.height);
        console.log(img.width);
        if (this.height >= 150 && this.height <= 200 && this.width >= 150 && this.width <= 200){
            document.querySelector('.avartar-img').src =  ImgSrc;
            // document.querySelector('#stud-img-avt').setAttribute('value', ImgSrc);
            $('#stud-img-avt').val(ImgSrc);
        }else{
            alert("Image size must be 150px by 150px");
        }
         }
    img.src = ImgSrc;
}

// upate image of avatar
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
        checkImgDimensions(e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

