$(document).ready(function () {
  $('.carousel__inner').slick({
    speed: 1200,
    adaptiveHeight: true,
    prevArrow: '<button type="button" class="slick-prev"><img src="../icons/left_arrow.png"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="../icons/right_arrow.png"></button>',
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

//modal

$('[data-modal="consultation"]').on('click', function() {
  $('.overlay, #consultation').fadeIn('slow');
})

//закрыть модальное окно при клике на крестик
$('.modal__close').on('click', function() {
  $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
})

//при нажатии кнопки заказа также меняем заголовок исходя из того в какой итем тыкнули
$('.button_catalog').each(function(i) {
  $(this).on('click', function() {
    $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
    $('.overlay, #order').fadeIn('slow');
  })
})

