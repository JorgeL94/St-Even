var FuncionalidadesHeader = function (){

	var init = function(){
		generales();
		// mostrarResumen();

		if($('body').hasClass('imPhone')){
			/*--------------------- ORGANIZAR HEADER ---------------------*/		
			var btnTiendasMb = $('.contentHeaderMobile .contFieldDesk .left .btnTiendas');
			$('.contentHeaderMobile .contFieldDesk .right .carrito').before(btnTiendasMb);
			funcionalidadMenuMobile();
			stickyHeaderMobile();
		}
		else{

			if($('body').hasClass('imTablet')){
				var visibilityHeaderDesk = $('.contentHeaderDesk').css('display');
				var visibilityHeaderMob = $('.contentHeaderMobile').css('display');
				if(visibilityHeaderDesk = 'block'){
					stickyHeaderDesktop();	
				}
				else{
					stickyHeaderMobile();
					// funcionalidadMenuTablet();
				}
			}
			else{
				stickyHeaderDesktop();
				// funcionalidadMenuDesktop();
			}
		}
	};

	var generales = function(){
		// $('.fulltext-search-box').attr('placeholder','¿Qué Buscas?');

		$('.contentHeaderMobile .contFieldDesk .btnBuscador').click(function(e){
			$('.contentHeaderMobile .contBuscador').slideToggle();
		});

	};

	//DESKTOP Y TABLET

	var funcionalidadMenuDesktop = function(){
		$('.itemMenu').parent().hover(function(){
			$(this).find('.contentSubmenu').fadeIn('fast');
			$(this).find('.itemMenu').addClass('overBtnMenu');
		},function(){
		    $(this).find('.contentSubmenu').fadeOut('fast');
		    $(this).find('.itemMenu').removeClass('overBtnMenu');
		});
	};

	var funcionalidadMenuTablet = function(){
		$('.btnSubMenu').removeAttr('href');
		$('.itemMenu').parent().click(function(){
			$(this).siblings().find('.contentSubmenu').fadeOut('fast');
			$(this).siblings().find('.itemMenu').removeClass('overBtnMenu');
			$(this).find('.contentSubmenu').fadeToggle('fast');
			$(this).find('.itemMenu').toggleClass('overBtnMenu');
		});
	};

	var stickyHeaderDesktop = function(){
		var heightPromesaValor = $('.promesaValor').outerHeight();
		var headerMobil = $('.contentHeaderDesk').outerHeight();
		// var header = $
		$(window).scroll(function(){
        	var altoNavegador = $(window).height();

        	$('.ui-autocomplete').slideUp();

	        if ($(window).scrollTop() > heightPromesaValor){
	        	var altoMenuMobile = altoNavegador - headerMobil;

	        	$('.contentHeaderDesk').addClass('headerStikyDesk');
	        	$('.containerContent').addClass('contenidoStiky');
	        }else{
	        	var altoMenuMobile = altoNavegador - headerMobil;

	        	$('.contentHeaderDesk').removeClass('headerStikyDesk');
	        	$('.containerContent').removeClass('contenidoStiky');
	        }
	    });

	};

	var mostrarResumen = function(){

		if($('body').hasClass('imTablet')){
			$('.headerDesktop .bottomContent .contetnCarrito .carrito .itemsCarrito a').removeAttr('href');
			$('.headerDesktop .bottomContent .contetnCarrito .carrito').click(function(){

				setTimeout(function(){
					ejecutarSliderResumen();
				},100);
				// $('.resumenCarrito .itemsResumen').toggleFade();
				$('.resumenCarrito').fadeToggle('fast').toggleClass('showCart');
				$('.blackBoxCarrito').fadeToggle('fast');

			});
			$('.resumenCarrito').click(function(event){
				event.stopPropagation();
			});

			$('.blackBoxCarrito').click(function(){

				destruirSliderResumen();
				// $('.resumenCarrito .itemsResumen').fadeOut();
				$('.resumenCarrito').fadeOut('fast').removeClass('showCart');
				$(this).fadeOut('fast');


			});
		}
		else{
			$('.headerDesktop .bottomContent .contetnCarrito .carrito').hover(function(){

				setTimeout(function(){
					ejecutarSliderResumen();
				},100);
				// $('.resumenCarrito .itemsResumen').fadeIn();
				$('.resumenCarrito').fadeIn('fast').addClass('showCart');
				$('.blackBoxCarrito').fadeIn('fast');


			},function(){

				destruirSliderResumen();
				// $('.resumenCarrito .itemsResumen').fadeOut();
				$('.resumenCarrito').fadeOut('fast').removeClass('showCart');
				$('.blackBoxCarrito').fadeOut('fast');

			});
		}

	};

	var destruirSliderResumen = function(){
		if($('.headerDesktop .resumenCarrito .itemsResumen li').length > 3){
		    if(!$('.headerDesktop .carrito .resumenCarrito .itemsResumen').is(':empty') ){
		    	$('.headerDesktop .carrito .resumenCarrito .itemsResumen').slick('unslick');
		    	// $('.headerDesktop .carrito .resumenCarrito .itemsResumen').empty();
			}
	    }
	};



	var ejecutarSliderResumen = function(){
		//EJECUTAR SLIDER RESUMEN CARRITO
		if($('.headerDesktop .resumenCarrito .itemsResumen li').length > 3){
	    	$('.headerDesktop .resumenCarrito .itemsResumen').slick({
				slidesToShow: 3,
				slidesToScroll: 1,
				arrows: true,
				prevArrow: '<a class="slick-prev"></a>',
				nextArrow: '<a class="slick-next"></a>',
				infinite: false,
	    		responsive: [
	    		    {
	    		      	breakpoint: 1150,
	    		      	settings: {
		    		        slidesToShow: 2
	    		     	}
	    		    }
	    		]
	    	});
		}
	};

	var crearResumenCarrito = function(jsonOrder){
		var crearHtmlItemsCarrito = function (orderForm){

			var infoAgrergado = [];
			var cantidadUnidades = 0;
		    for(var i = 0; i < orderForm.items.length; i++){
		    	var itemActual = orderForm.items[i];
		    	cantidadUnidades += itemActual.quantity;
		    	infoAgrergado.push({
					'urlAgregado' : itemActual.detailUrl, 
					'imagenAgregado' : itemActual.imageUrl.replace('-100-100','-150-150'), 
					'nombreAgregado' : itemActual.name,
					'precioAgregado' : '$' + FuncionalidadesGenerales.formatearMoneda( itemActual.sellingPrice / 100, 2, ',', '.'),
					'cantidadAgregado' : itemActual.quantity
				});
		    }

	        var htmlItemCarrito = '';

	    	for(var i = 0; i < infoAgrergado.length; i++){
	    	    var productoAgregaddo = infoAgrergado[i];

	    	    htmlItemCarrito +=	'<li>';
	    	    htmlItemCarrito +=		'<div class="mainContentProductoAgre">';
	    	    htmlItemCarrito +=			'<div class="contentImgProductoAgre">';
	    	    htmlItemCarrito +=				'<a href="' + productoAgregaddo.urlAgregado + '">';
	    	    htmlItemCarrito +=					'<img src="' + productoAgregaddo.imagenAgregado.replace('55-55','500-500') + '" alt="' + productoAgregaddo.nombreAgregado + '"/>';
	    	    htmlItemCarrito +=				'</a>';
	    	    htmlItemCarrito +=			'</div>';
	    	    htmlItemCarrito +=			'<div class="contentInfoProductoAgre">';
	    	    htmlItemCarrito +=				'<div class="eliminarProductoAgre" onclick="FuncionalidadesHeader.eliminarProductoCarrito(' + i + ');"></div>';
	    	    htmlItemCarrito +=				'<a href="' + productoAgregaddo.urlAgregado + '">';
	    	    htmlItemCarrito +=					'<h4 class="nombreProductoAgre">' + productoAgregaddo.nombreAgregado + '</h4>';
	    	    htmlItemCarrito +=					'<p class="precioProductoAgre">' + productoAgregaddo.precioAgregado + '</p>';
	    	    htmlItemCarrito +=					'<p class="cantidadItemAgre">Cantidad';
	    	    htmlItemCarrito +=						'<span>' + productoAgregaddo.cantidadAgregado + '</span>';
	    	    htmlItemCarrito +=					'</p>';
	    	    htmlItemCarrito +=				'</a>';
	    	    htmlItemCarrito +=			'</div>';
	    	    htmlItemCarrito +=		'</div>';
	    	    htmlItemCarrito +=	'</li>';

	    	}

	    	var totalResumenCarrito = FuncionalidadesGenerales.formatearMoneda( orderForm.value / 100, 2, ',', '.');

	    	var htmlTotalCarrito = '';
		    	htmlTotalCarrito +=		'<div class="resumenTotal">'
		    	htmlTotalCarrito +=			'<div class="bg"></div>'
		    	htmlTotalCarrito +=			'<p>Total:';
		    	htmlTotalCarrito +=				'<span>' + totalResumenCarrito + '</span>';
		    	htmlTotalCarrito +=			'</p>';
		    	htmlTotalCarrito +=		'</div>';
		    	htmlTotalCarrito +=		'<div class="pagar">';
		    	htmlTotalCarrito +=			'<a href="/checkout/">ir a pagar</a>';
		    	htmlTotalCarrito +=		'</div>';

	    	$('.headerDesktop .resumenCarrito .itemsResumen').empty().append(htmlItemCarrito);

	    	$('.headerDesktop .resumenCarrito .totalCompra').empty().append(htmlTotalCarrito);
			$('.carrito .itemsCarrito p').empty().text(cantidadUnidades);


		};
		

		if( typeof jsonOrder === 'undefined'){
			// console.log('///// EL ORDER FORM ES UNDEFINED');
			vtexjs.checkout.getOrderForm().done(function(orderForm){
			    if (orderForm.items.length > 0) {
				    crearHtmlItemsCarrito(orderForm);
				    $('.emptyProducts').remove();
				    $('.resumenCarrito .totalCompra').show();
				    $('.resumenCarrito .resumenTotal').show();
			    }
			    else{
    				$('.resumenCarrito .totalCompra').hide();
    				$('.resumenCarrito .resumenTotal').hide();
    				$("<h3 class='emptyProducts'>No has agregado nada a tu carrito de compras</h3>").insertAfter(".resumenCarrito h2");
    				$('.carrito .itemsCarrito p').empty().text(0);
    			}
			});	
		}else {
			// console.log('///// EL ORDER FORM NO ES UNDEFINED');
		    if (jsonOrder.items.length > 0) {
			    crearHtmlItemsCarrito(jsonOrder);
			    $('.emptyProducts').remove();
			    $('.resumenCarrito .totalCompra').show();
			    $('.resumenCarrito .resumenTotal').show();
		    }
		    else{
				$('.resumenCarrito .totalCompra').hide();
				$('.resumenCarrito .resumenTotal').hide();
				$("<h3 class='emptyProducts'>No has agregado nada a tu carrito de compras</h3>").insertAfter(".resumenCarrito h2");
				$('.carrito .itemsCarrito p').empty().text(0);
			}
		}	
	};

	var eliminarProductoCarrito = function(itemIndex){
		vtexjs.checkout.getOrderForm().then(function(orderForm){
		    var item = orderForm.items[itemIndex];
		    item.index = itemIndex;
		    return vtexjs.checkout.removeItems([item]);
		}).done(function(orderForm){
			if($('.headerDesktop .resumenCarrito .itemsResumen li').length > 3){
				destruirSliderResumen();
				setTimeout(function(){
					ejecutarSliderResumen();
				}, 200);
			}
		    crearResumenCarrito(orderForm);
		});
	};

	//MOBILE

	var stickyHeaderMobile = function(){
		var heightPromesaValor = $('.promesaValor').outerHeight();
		var headerMobil = $('.contentHeaderMobile').outerHeight();
		$(window).scroll(function(){
        	var altoNavegador = $(window).height();

        	$('.ui-autocomplete').slideUp();
        	$('.contBuscador').slideUp();

	        if ($(window).scrollTop() > heightPromesaValor){
	        	var altoMenuMobile = altoNavegador - headerMobil;

	        	$('.contentHeaderMobile').addClass('headerStikyMob');
	        	$('.containerContent').addClass('contenidoStiky');
	        	$('.contMenuMobile').height( altoMenuMobile );
	        }else{
	        	var altoMenuMobile = altoNavegador - headerMobil;

	        	$('.contentHeaderMobile').removeClass('headerStikyMob');
	        	$('.containerContent').removeClass('contenidoStiky');
	        	$('.contMenuMobile').height( altoMenuMobile );
	        }
	    });
	};

	var funcionalidadMenuMobile = function(){


		/*--------------------- ABRIR MENU ---------------------*/
		
		var altoNavegador = $(window).height();
		var headerMobil = $('.headerMobil').outerHeight();
		var altoMenuMobile = altoNavegador - headerMobil;

		$('.menuMobile').height( altoMenuMobile );

		$('.btnMenu').click(function(e){
			e.preventDefault();
			$('body').toggleClass('hiddenScroll');
			// $('.fullMainContent').toggleClass('hiddenScroll');
			if($('.menuMobile').is(':visible')){
				console.log('Es visible');
				$('.menuMobile').removeClass('openMenu');
				setTimeout(function(){
					$('.btnMenu').removeClass('btnMenuOpenMenu');
					$('.menuMobile').slideUp();
				}, 100);
			}else{
				console.log('No es visible');
				$(this).addClass('btnMenuOpenMenu');
				$('.menuMobile').slideDown(function(){
					$('.menuMobile').addClass('openMenu');
				});
			}
			$('.menuMobile >ul >li').slideDown();
			$('.btnSubMenuLv1').next().slideUp().removeClass('openLinks');
			$('.btnSubMenuLv1').removeClass('openLinks');
			$('.btnSubMenuLv2').next().slideUp().removeClass('openLinks');
			$('.btnSubMenuLv2').removeClass('openLinks');
		});
		

		/*--------------------- ABRIR SUBMENU LV1 ---------------------*/

		$('.menuMobile').find('.btnSubMenuLv1').click(function(event){
			event.preventDefault();
			$(this).parent().siblings().slideToggle();
			$(this).next('ul').find('.btnSubMenuLv2').next('ul').slideUp();
			$(this).next('ul').find('.btnSubMenuLv2').removeClass('openLinks');
			$(this).next('ul').slideToggle();
			$(this).toggleClass('openLinks');
			
		});


		/*--------------------- ABRIR SUBMENU LV2 ---------------------*/

		$('.menuMobile').find('.btnSubMenuLv2').click(function(event){
			event.preventDefault();
			$(this).parent().siblings().find('.btnSubMenuLv2').next('ul').slideUp();
			$(this).parent().siblings().find('.btnSubMenuLv2').removeClass('openLinks');
			$(this).next('ul').slideToggle();
			$(this).toggleClass('openLinks');
			
		});

	};

	return{
		init:init,
		crearResumenCarrito:crearResumenCarrito,
		eliminarProductoCarrito:eliminarProductoCarrito
	}
}();

var FuncionalidadesFooter = function (){

	var init = function(){
		linksInteres();
	};

	var linksInteres = function(){
		$('footer .linksInteresContent li.btnSubLinks h4').click(function(){
			$(this).parent().siblings('.btnSubLinks').find('h4').next().slideUp();
			$(this).parent().siblings('.btnSubLinks').find('h4').removeClass('openLinks');
			$(this).next().slideToggle();
			$(this).toggleClass('openLinks');
		});
	};

	return{
		init:init
	}
}();

var FuncionalidadesGenerales = function () {
	var init = function() {
		generales();
		llenarImagenes();
	};	

	var generales = function(){
		$('[class*="helperComplement"]').remove();
		window.alert = function() {};

		if($('body').hasClass('orders')){
			// $('html').addClass('htmlOrders');
		}

		if($('body').hasClass('imPhone')){
			$('.onlyDesktopImg').remove();
		}
		else{
			$('.onlyMobileImg').remove();
		}

		setTimeout(function(){
		    $('.vtexIdUI .modal-header .vtexIdUI-close').attr('onClick','javascript:window.history.back();');
		},2000);


		//CREAR BREAD CRUMB 'VOLVER ATRAS'
		var firstBread = $('#contBreds .bread-crumb ul li').first();
		firstBread.before('<li class="backPageBread"><a onClick="javascript:window.history.back();">Atras</a></li>');

	};

	var llenarImagenes = function(){
		var imagenesLazy = $('img.lazyLoadImage');
		var srcImage = '';

		if($('body').hasClass('imPhone')){
			imagenesLazy.each(function(){
				srcImage = $(this).data('mobile');
	        	$(this).attr('src',srcImage);
	        	// $(this).parent().parent('.itemBannerSec').css('background-image','url(' + srcImage + ')');
	        });
		}
		else{
			imagenesLazy.each(function(){
				srcImage = $(this).data('desktop');
	        	$(this).attr('src',srcImage);
	        	// $(this).parent().parent('.itemBannerSec').css('background-image','url(' + srcImage + ')');
	        });

			/*
        	if($('body').hasClass('imTablet')){
        		imagenesLazy.each(function(){
        			srcImage = $(this).data('tablet');
                	$(this).attr('src',srcImage);
                	$(this).parent().parent('.itemBannerSec').css('background-image','none');
                });
        	}
        	else{
        		imagenesLazy.each(function(){
        			srcImage = $(this).data('desktop');
                	$(this).attr('src',srcImage);
                	$(this).parent().parent('.itemBannerSec').css('background-image','url(' + srcImage + ')');
                });
        	}
        	*/
		}
	};

    var getParameterByName = function(stringUrl, name) {
	    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	        results = regex.exec(stringUrl);
	    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	};

	var formatearMoneda = function( numero, numDecimales, separadorMiles, separadorDecimales){
        var n = numero, 
        numDecimales = isNaN(numDecimales = Math.abs(numDecimales)) ? 2 : numDecimales, 
        separadorDecimales = separadorDecimales == undefined ? "." : separadorDecimales, 
        separadorMiles = separadorMiles == undefined ? "," : separadorMiles, 
        s = n < 0 ? "-" : "", 
        i = parseInt(n = Math.abs(+n || 0).toFixed(numDecimales)) + "", 
        j = (j = i.length) > 3 ? j % 3 : 0;
       return s + (j ? i.substr(0, j) + separadorMiles : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + separadorMiles) + (numDecimales ? separadorDecimales + Math.abs(n - i).toFixed(numDecimales).slice(2) : "");
    };

	return{
		init:init,
		getParameterByName:getParameterByName,
		formatearMoneda:formatearMoneda,
		llenarImagenes:llenarImagenes
	}
}();

var FuncionalidadesVitrina = function (){

	var init = function(){

		var arregloAlturasNombreProducto = [];
		$('div.productVitrine').each(function(){
			if(!$(this).hasClass('vitrinaCheck')){
				$(this).addClass('vitrinaCheck');
				calcularArregloAlturasNombreProducto( $(this) , arregloAlturasNombreProducto);
				porcentajeDescuento( $(this) );
			}
		});

		// ajustarAltoNombreProducto(arregloAlturasNombreProducto);
	};

	var ajustarAltoNombreProducto = function(arregloAlturasNombreProducto){
		
		var alturaMaxima = Math.max.apply(Math, arregloAlturasNombreProducto);

		$('div.productVitrine').each(function(){
			var nameProdDivVitrine = $(this).find('.nameProd');
			nameProdDivVitrine.outerHeight(alturaMaxima);
		});
	};

	var calcularArregloAlturasNombreProducto = function(divVitrina, arregloAlturasNombreProducto){
		var nameProdDivVitrine = divVitrina.find('.nameProd');
		arregloAlturasNombreProducto.push(nameProdDivVitrine.outerHeight());
	};

	var porcentajeDescuento = function(divDescuentoProducto){
	    var precio1 = divDescuentoProducto.find('.productList').text().replace("$","").replace(".","").replace(",","");
	    var precio2 = divDescuentoProducto.find('.bestPrice').text().replace("$","").replace(".","").replace(",","");
	    if(precio1.length >= 1){
	        var descuento = precio1-precio2;
	        var porcentaje = (descuento*100)/precio1;
	        porcentaje = Math.round(porcentaje);
	        // var porcentajeDesc = porcentaje.substr(1,2);
	        if(precio1 != precio2){
	            divDescuentoProducto.find('.tagDescuento .discount').empty().text('' + porcentaje +'%');
	            divDescuentoProducto.find('.tagDescuento').show();
	        }
	    }
	};

	//FUNCION PARA PINTAR COLOR Y TALLAS EN VITRINA
	var printSkus_BuyVitrine = function(product){

	  	// SE OBTIENE EL HIDDENID DEL PRODUCTO Y LO RETORNAMOS COMO UN STRING PARA PODERLO USAR
	  	var mainContainerVitrine = $("#product_" + product.productId);
	  	var colorSkuContent = mainContainerVitrine.find( ".colorContent .skuColor" );
	  	var sizeSkuContent = mainContainerVitrine.find( ".tallaContent .skuTalla" );
	  	var srcImageCurrent = mainContainerVitrine.find('.innerContentImage img').attr('src');

	  	// console.info(srcImageCurrent);

	  	//ADD IMG EN COMPRA RAPIDA:
	  	mainContainerVitrine.find(".contentFastShop .fastShopImage").empty().append('<img src="' + srcImageCurrent + '" />');

	  	// DEFINICION VARIABLES DE ARREGLOS DE SKU
	  	var colorsArray = [];
	  	var colorsHtml = "";
	  	var sizeArray = [];
	  	var sizeHtml = "";

	  	//SE OBTIENE DEL OBJETO LA TALLA , EL COLOR Y SE CREA EL ARREGLO CORRESPONDIENTE
	  	for(var i = 0; i < product.dimensionsMap.Color.length ; i++){
	    	mainContainerVitrine.attr('id', product.productId).addClass('product_' + product.productId);
	  		colorsArray.push(product.dimensionsMap.Color[i]);
	    	colorsHtml += "<li class='skuColorItem skuColor_" + product.productId + "'>" + colorsArray[i] + "</li>";
	  	}

	  	$(colorSkuContent).append(colorsHtml);
	  	
	  	//COLOCAR RGB EN EL SELECTOR DE COLOR
	  	$('.product_' + product.productId + ' .colorContent .skuColor .skuColorItem').each(function(indexObj,valueObj){
	  		var textoColor = $(valueObj).text().split('-');
	  		$(valueObj).addClass('colorItem-' + textoColor[1]).css('background-color',textoColor[0]);
	  	});
	  
	  	for(var i = 0; i < product.dimensionsMap.Talla.length ; i++){
	  		sizeArray.push(product.dimensionsMap.Talla[i]);
	      	sizeHtml += "<li class='skuTallaItem skuTalla_" +  product.productId + " talla_" + sizeArray[i] + "'>" + sizeArray[i] + "</li>";
	  	}
	  	$(sizeSkuContent).append(sizeHtml);

	  	//ABRIR COMPRA RAPIDA EN MOBILE
	  	fastShop(product.productId);

		$(".product_" + product.productId +  " .botonAgregar, .fastShop-" + product.productId +  " .botonAgregar").click(function(){

  			if ($(this).parent().siblings('.skuSelectShop').find('.skuColorItem.selectedColor').length < 1) {
  				console.warn('NO HAY COLOR SELECCIONADO');
  				$(this).parent('.buttonContainer').find('h3.errorSkuProductoColor').remove();
  				$(this).before('<h3 class="errorSkuProductoColor errorSku">Selecciona el color</h3>');
  			}
  			if ($(this).parent().siblings('.skuSelectShop').find('.skuTallaItem.selectedSize').length < 1) {
  				console.warn('NO HAY TALLA SELECCIONADO');
  				$(this).parent('.buttonContainer').find('h3.errorSkuProductoTalla').remove();
  				$(this).before('<h3 class="errorSkuProductoTalla errorSku">Selecciona la talla</h3>');
  			}

		});

	  	// SELECCION DE COLOR
	  	$(".skuColor_" + product.productId ).click(function(){

	    	$(this).addClass('activeColor').siblings().removeClass('activeColor');
	    	$('h3.errorSkuProductoColor').remove();

		    if(!$(this).hasClass('selectedColor')){

		      	var colorActual = $(this).text();

		      	$(this).addClass('selectedColor').siblings().removeClass('selectedColor');

		      	var selectedSize = $(sizeSkuContent).find(".selectedSize").first().text();

		      	var firstSkuAvailable;
		      	var firstSku;
		      	var imageSku;

		      	// RESETEAR EL CONTENIDO DE TALLAS CADA VEZ QUE SE CAMBIA EL COLOR
		      	$(sizeSkuContent).empty();
		      
		      	var skus = [];

		      	for(var i=0; i < product.skus.length ; i ++){
		      	  	skus.push(product.skus[i].dimensions.Talla);          
		      	}

		      	// skus = skus.sort(function(a, b){return a-b});
		      	skus = deleteDuplicates(skus);

		      	var arrayProductSku = [];

		      	for(var j = 0; j < skus.length;j++){
		      	  	for(var i=0; i < product.skus.length ; i ++){
		      	      	if(product.skus[i].dimensions.Talla == skus[j]){
		      	        	arrayProductSku.push(product.skus[i])
		      	      	}
		      	  	}		          
		      	}

		      	for(var i=0; i < arrayProductSku.length ; i ++){
		      	  	var currentSku = arrayProductSku[i];
		      	  	if(currentSku.dimensions["Color"] == colorActual){
		      	  	  	if( currentSku.available &&  typeof firstSkuAvailable === "undefined" ){
		      	  	  	  	firstSkuAvailable = currentSku;
		      	  	  	}
		      	  	  	if( typeof firstSku === "undefined" ){
		      	  	  	  	firstSku = currentSku;
		      	  	  	}
		
		      	  	  	var currentSizeDiv = $("<li class='skuTallaItem skuTalla_" +  product.productId + 
		      	  	  		(currentSku.dimensions["Talla"] == selectedSize ? " selectedSize " : "") + 
		      	  	  		( ! currentSku.available ? " unavailable " : "") + 
		      	  	  		" talla_" + currentSku.dimensions["Talla"] + "' >" + currentSku.dimensions["Talla"] + "</li>");
		
		      	  	  	$(sizeSkuContent).append(currentSizeDiv);
		
		      	  	  	//SE SELECCIONA LA TALLA
		      	  	  	var clickSizeEvent = function(passedInElement1, passedInElement2) {
		      	  	  	    return function(event) {
		      	  	  	        agregarAlCarritoVitrina(passedInElement1, passedInElement2); 
		      	  	  	    };
		      	  	  	};
		      	  	  	currentSizeDiv.on("click", clickSizeEvent(currentSku, product.productId));

		      	  	  	if(imageSku!="undefined"){
		      	  	  	  	imageSku = currentSku.image;
		      	  	  	}
		      	  	}
		      	}

		      	//CAMBIO DE IMG DEPENDIENDO DE EL COLOR:
		      	$(".product_" + product.productId + " img").attr("src", imageSku);
		      	$(".fastShop-" + product.productId + " img").attr("src", imageSku);

		    }
		    cambiarTalla(product);
	  	});

	};

	var agregarAlCarritoVitrina = function(sku, idProducto){
	  	var currentId = (idProducto);
	  	var newName = (sku.skuname);
	  	var newPrice = (sku.bestPriceFormated);
	  	var oldPrice = (sku.listPriceFormated);
	  	$(".product_" + currentId +  " .contVitrineName .nameProd a").html(newName);
	  	$(".product_" + currentId +  " .contVitrineName .prices .bestPrice").html(newPrice);
	  	$(".product_" + currentId +  " .contVitrineName .prices .productList").html(oldPrice);

	  	// console.warn('ENTRO A CAMBIO DE COLOR Y TALLA');

	  	$(".product_" + currentId +  " .botonAgregar, .fastShop-" + currentId +  " .botonAgregar").click(function(){

			// $(this).parent('.buttonContainer').find('h3.errorSkuProductoColor').remove();
			// $(this).parent('.buttonContainer').find('h3.errorSkuProductoTalla').remove();


		  	// console.warn('SE HIZO CLICK A AGREGAR PRODUCTO');
	  		$('#lightboxCart .itemAgregado .imageItem img').attr('alt',sku.skuname);
	  		
	  		$('#lightboxCart .itemAgregado .imageItem img').attr('src',sku.image);
	  		$('#lightboxCart .infoItem .price').text(newPrice);
	  		$('#lightboxCart .infoItem .quantity .unidadesItem').text('Unidad');
	  		$('#lightboxCart .infoItem .quantity .quantityItem').text('1');	

  			if($('body').hasClass('imPhone') || $('body').hasClass('imTablet')){
  				if($('body').hasClass('producto') || $('body').hasClass('home') || $('body').hasClass('departamento')) {
  					// console.warn('ESTOY EN CARRUSEL');
		  			$('.blackboxCart').fadeIn();
		  			$('.fastShop-' + currentId + '').fadeOut().add;
		  			$('.product_' + currentId + '').find('.productImage').append($('.fastShop-' + currentId + ''));
		  			$('.blackboxFastShop').remove();
			  	  	addProductToCart(sku);
  				}
  				else{
		  			$('.blackboxCart').fadeIn();
		  			$(this).parent().parent().fadeOut();
		  			$(this).parent().parent().siblings('.blackboxFastShop').remove();
			  	  	addProductToCart(sku);
  				}
  			}
  			else{
  				if($('body').hasClass('producto') || $('body').hasClass('home') || $('body').hasClass('departamento')) {
  					console.warn('ESTOY EN CARRUSEL')
		  			$('.blackboxCart').fadeIn();
		  			$('.fastShop-' + currentId + '').fadeOut().add;
		  			$('.product_' + currentId + '').find('.productImage').append($('.fastShop-' + currentId + ''));
		  			$('.blackboxFastShop').remove();
			  	  	addProductToCart(sku);
  				}
  				else{
		  			$('.blackboxCart').fadeIn();
			  	  	addProductToCart(sku);
  				}
  			}
	  	});
	};
	var cambiarTalla = function(product){
	  	$(".skuTalla_" + product.productId).click(function(){
			$('h3.errorSkuProductoTalla').remove();
	    	if(!$(this).hasClass('selectedSize')){
	      		var size = $(this).text();
	      		$(this).addClass('selectedSize').siblings().removeClass('selectedSize');
	    	}
	  	});
	};
	var addProductToCart = function(skuCurrent){
	  	var urlAddToCart = "/checkout/cart/add?sku=" + skuCurrent.sku + "&qty=1&seller=1&redirect=false&sc=1";

	  	var options = {
	  	  	url: urlAddToCart,
	  	  	type: "get",
	  	  	success: function(data) {
	  	  	  	var quantityGeneral = 0;
	  	  	  	vtexjs.checkout.getOrderForm().done(function(orderForm) {
	  	  	  	  	$.each(orderForm.items,function(indexItems,valueItems){
	  	  	  	  	  	quantityGeneral += valueItems.quantity
	  	  	  	  	});

	  	  	  	  	FuncionalidadesHeader.crearResumenCarrito();
	  	  	  	  	$('#lightboxCart .infoResumenCart .totalItemsAdd .itemsResumen .textQty').text(quantityGeneral);
	  	  	  	  	$('#lightboxCart .infoResumenCart .totalItemsAdd .itemsResumen .textPrendas').text((quantityGeneral > 1)?'Prendas':'Prenda');
	  	  	  	  	var valorTotal = FuncionalidadesGenerales.formatearMoneda(orderForm.value / 100, 2, '.', ',');
	  	  	  	  	$('#lightboxCart .infoResumenCart .contTotal .totalCart .numberTotal').text('$'+valorTotal);
			
	  	  	  	  	//CALCULAR FALTANTE PARA EL ENVIO GRATIS
	  	  	  	  	//VALOR TOTAL CARRITO
	  	  	  	  	var valorTotalFull = orderForm.value;
	  	  	  	  	valorTotalFull = valorTotalFull.toString();
	  	  	  	  	valorTotalFull = valorTotalFull.slice(0,-2);
	  	  	  	  	//FALTANTE PARA EL ENVIO
	  	  	  	  	var valorRestanteFree = 799 - valorTotalFull;
	  	  	  	  	var porcentajeFree = (valorTotalFull*100)/799;
	  	  	  	  	porcentajeFree = Math.round(porcentajeFree)
			
	  	  	  	  	if(valorRestanteFree < 799 && valorRestanteFree > 0){
	  	  	  	  	  	$('.faltanteEnvioGratisText .itemResumenFull').remove();
	  	  	  	  	  	$('.faltanteEnvioGratisText .itemsResumen .faltanteEnvio').text('$' + valorRestanteFree + '.00');
	  	  	  	  	  	$('.contentEnvioGratis .contadorEnvio .porcentCounter').text(porcentajeFree+ '%');
	  	  	  	  	  	$('.contentEnvioGratis .contadorEnvio .bgCounter').css('width', porcentajeFree+'%');
	  	  	  	  	  	if(porcentajeFree >= 40){
	  	  	  	  	  	  	$('.contentEnvioGratis .contadorEnvio .porcentCounter').addClass('porcentCounterFull');
	  	  	  	  	  	}
	  	  	  	  	}
	  	  	  	  	else{
	  	  	  	  	  	$('.faltanteEnvioGratisText .itemsResumen').hide();
	  	  	  	  	  	$('.faltanteEnvioGratisText .itemResumenFull').remove();
	  	  	  	  	  	$('.faltanteEnvioGratisText .itemsResumen').after('<p class="itemResumenFull">¡Tu envío será gratuito!</p>');
	  	  	  	  	  	$('.contentEnvioGratis .contadorEnvio .porcentCounter').text('100%').addClass('porcentCounterFull');
	  	  	  	  	  	$('.contentEnvioGratis .contadorEnvio .bgCounter').css('width', '100%');
	  	  	  	  	}
		
	  	  	  	});
	  		}
		}
	  	$('#lightboxCart').click(function(e){
	  	  	e.stopPropagation();
	  	});
	  	$('.addMoreProducts, #lightboxCart .cerrar').click(function(e){
	  	  	e.preventDefault();
	  	  	$('.blackboxCart').fadeOut();
	  	});
	  	$('.blackboxCart').click(function(e){
	  	  	e.preventDefault();
	  	  	$(this).fadeOut();
	  	});
	  	jQuery.ajax(options);
	};
	var deleteDuplicates = function(ar) {
	  	var ya = false, v = "", aux = [].concat(ar), r = Array();
	  	for (var i in aux) { // 
	  	  	v = aux[i];
	  	  	ya = false;
	  	  	for (var a in aux) {
	  	  	  	if (v == aux[a]) {
	  	  	  	  	if (ya == false) {
	  	  	  	  	  	ya = true;
	  	  	  	  	}	
	  	  	  	  	else {
	  	  	  	  	  	aux[a] = "";
	  	  	  	  	}
	  	  	  	}
	  	  	}
	  	}
	  	for (var a in aux) {
	  	  	if (aux[a] != "") {
	  	  	  	r.push(aux[a]);
	  	  	}
	  	}
	  	return r;
	};

	//ABRIR COMPRA RAPIDA EN MOBILE
	var fastShop = function(idProducto){

		var mainContainerVitrine = $('.product_' + idProducto);
		var backboxCompraRapida = '<div class="blackboxFastShop"></div>';

		mainContainerVitrine.find('.btnWishListMobile').click(function(idProducto){
			$('.blackboxWL').fadeIn();
		});

		$('.lightboxWL').click(function(e){
			e.stopPropagation();
		});
		$('.lightboxWL .cerrar').click(function(e){
			$('.blackboxWL').fadeOut();
		});
		$('.blackboxWL').click(function(){
			$(this).fadeOut();
		});

		if($('body').hasClass('producto') || $('body').hasClass('home') || $('body').hasClass('departamento')) {
			mainContainerVitrine.find('.botonAgregarMobile').click(function(){

				var contenedorFastShop = mainContainerVitrine.find('.contentFastShop');
				contenedorFastShop.addClass('fastShop-' + idProducto);

				$('div[class*="colunas"]').append(contenedorFastShop);
				contenedorFastShop.fadeIn();
				contenedorFastShop.append('<div class="cerrar closeVitrina_' + idProducto + '"></div>');
				contenedorFastShop.before(backboxCompraRapida);

				contenedorFastShop.find('.cerrar').click(function(){
					$(this).parent(contenedorFastShop).fadeOut();
					mainContainerVitrine.find('.productImage').append(contenedorFastShop);
					$('.blackboxFastShop').remove();
				});
			});

			mainContainerVitrine.find('.blackboxFastShop').click(function(){
				mainContainerVitrine.find('.contentFastShop').fadeIn();
				$(this).remove();
			});

			$('.fastShop-' + idProducto).find('.btnWishList').click(function(idProducto){
				
				$(this).parent().parent('.contentFastShop').fadeOut();
				mainContainerVitrine.find('.blackboxFastShop').remove();
				$('.blackboxWL').fadeIn();
			});
		}
		else{
			mainContainerVitrine.find('.botonAgregarMobile').click(function(){
				mainContainerVitrine.find('.contentFastShop').fadeIn();
				mainContainerVitrine.find('.contentFastShop').append('<div class="cerrar closeVitrina_' + idProducto + '"></div>');
				mainContainerVitrine.find('.productImage').append(backboxCompraRapida);

				mainContainerVitrine.find('.cerrar').click(function(){
					$(this).parent('.contentFastShop').fadeOut();
					mainContainerVitrine.find('.blackboxFastShop').remove();
				});
			});

			mainContainerVitrine.find('.blackboxFastShop').click(function(){
				mainContainerVitrine.find('.contentFastShop').fadeIn();
				$(this).remove();
			});

			mainContainerVitrine.find('.btnWishList').click(function(idProducto){
				$(this).parent().parent('.contentFastShop').fadeOut();
				mainContainerVitrine.find('.blackboxFastShop').remove();
				$('.blackboxWL').fadeIn();
			});
		};
	};

	return{
		init:init,
		printSkus_BuyVitrine:printSkus_BuyVitrine
	}

}();

FuncionalidadesGenerales.init();

$(document).ready(function(){
	// FuncionalidadesGenerales.init();
	FuncionalidadesHeader.init();
	// FuncionalidadesHeader.crearResumenCarrito();
	// FuncionalidadesFooter.init();
	// FuncionalidadesVitrina.init();
});

$(window).load(function(){
	$('.fullMainContent').removeClass('hiddenScroll');
	$('.blackboxLoader').fadeOut('slow');
});

