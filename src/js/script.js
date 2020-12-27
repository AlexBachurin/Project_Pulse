$(document).ready(function () {
  $('.carousel__inner').slick({
    speed: 1200,
    adaptiveHeight: true,
    prevArrow: '<button type="button" class="slick-prev"><img src="icons/left_arrow.png"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="icons/right_arrow.png"></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          dots: true,
          arrows: false,
        }
      }
    ]
  });
});

//простой скрипт для табов
$('ul.catalog__tabs').on('click', 'li:not(catalog__tab_active)', function() {
  $(this)
    .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
    .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active')
    .eq($(this).index()).addClass('catalog__content_active');
    //чтобы при переключении между табами открытые табитемы возвращались в исходное состояние
    //добавляем им обратно класс активности и убираем класс активности у описания
    $('.catalog-item__list').removeClass('catalog-item__list_active');
    $('.catalog-item__content').addClass('catalog-item__content_active');
});

//скрипт для переключения контента в итеме
$('.catalog-item__link').each(function(i) {
  $(this)
    .on('click' , function(e) {
      e.preventDefault();
      //переключаем класс активности при клике на кнопку "подробнее" у нужного табитема
      $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
      $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    })
})

$('.catalog-item__back').each(function(i) {
  $(this)
    .on('click' , function(e) {
      e.preventDefault();
      $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
      $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    })
})

//MODAL

$('[data-modal="consultation"]').on('click', function() {
  $('.overlay, #consultation').fadeIn('slow');
})

//закрыть модальное окно при клике на крестик
$('.modal__close').on('click', function() {
  // document.querySelector('#consultation form').reset(); //сброс формы
  //скрываем надписи о ошибке при закрытии формы
  document.querySelectorAll('label.error').forEach((item) => {
    item.style.display = "none";
  });
  // меняем цвет обводки инпута на обычный
  document.querySelectorAll('form input').forEach((item) => {
    item.classList.remove('error');
  })
  $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
})

//при нажатии кнопки заказа также меняем заголовок исходя из того в какой итем тыкнули
$('.button_catalog').each(function(i) {
  $(this).on('click', function() {
    $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
    $('.overlay, #order').fadeIn('slow');
  })
})

//FORM VALIDATION


function formValidate(formSelector) {
  $(formSelector).validate({
    rules: {
      name: {
        required: true,
        minlength: 2
      },
      phone: "required",
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      name: {
        required: "Пожалуйста, введите имя",
        minlength: jQuery.validator.format("Введите как минимум {0} символа")
      },
      phone: "Пожалуйста, введите номер своего телефона",
      email: {
        required: "Пожалуйста, введите почтовый адрес",
        email: "Правильный формат почты - name@domain.com"
      }
    },
    // focusCleanup: true
  });
}

formValidate('#consultation-main');
formValidate('#consultation .feed-form');
formValidate('#order .feed-form');

//Masked input for phone

$('input[name=phone]').mask("+7 (999) 999-99-99");

//send form

//send form

$('form').submit(function(e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "mailer/smart.php",
    data: $(this).serialize()
  }).done(function() {
    $(this).find("input").val(""); //очищаем инпут после отправки формы
    $('#consultation, #order').fadeOut(); //при правильной отправке убираем форму и 
    //подставляем благодарственное окно
    $('.overlay , #thanks').fadeIn('slow');
    //убираем благодарственное окно через 3 секунды
    setTimeout(function () {
      $('.overlay , #thanks').fadeOut();
    }, 3000);

    $('form').trigger('reset') //очищаем все формы
  });
  return false;
});


