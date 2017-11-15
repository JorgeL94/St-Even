var FuncionalidadesProducto = function () {

	var skuImages = {};
	var init = function(){
		generales();
		changeSku();
		buscarImagenes(skuJson.skus[0].sku);
		controlesCantidad();
		porcentajeDescuento();
		funcionalidadGuiaTallas();

		if($('body').hasClass('imPhone')){
			ajusteEstructuraMobile();
		}
	};

	var generales = function(){

		//PRESETS
		$('.contNameProduct').find('.discoutProd').hide();

		$('.contCantidad .ultimaUidad').hide();

		$('.shareSocial').find('.iconShare').click(function(){
			$(this).parent().find('.redesShare').toggleClass('openRedes');
		});

		//ABRIR - CERRAR LIGHTBOX LISTA DE DESEOS
		$('.addWishList').click(function(){
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

		//SCRIPT REDES SOCIALES
		(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.src = "//connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v2.5";
		  fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));

		//COLOCAR RGB EN EL SELECTOR DE COLOR
		$('.sku-selector-container .Color .skuList .dimension-Color').each(function(indexObj,valueObj){
			var textoColor = $(valueObj).text().split('-');
			$(valueObj).addClass('colorItem-' + textoColor[1]).css('background-color',textoColor[0]);
			// $(valueObj).click(function(){
			// 	$(valueObj).parent().parent().siblings('.specification').empty().append('Color:<strong class="colorName">' + textoColor[1] + '</strong>')
			// });
		});

		//SLIDER CARRUSEL
		$('.contRelacionado div[class*="colunas"] >ul').slick({
			slidesToScroll: 4,
			dots: true,
			slidesToShow: 4,
			infinite: true,
			prevArrow: '<a class="slick-prev"></a>',
			nextArrow: '<a class="slick-next"></a>',
			responsive: [
				{
					breakpoint: 1023,
					settings: {
						arrows: false,
						slidesToScroll: 3,
						slidesToShow: 3
					}
				},
				{
					breakpoint: 767,
					settings: {
						arrows: false,
						slidesToScroll: 1,
						slidesToShow: 1
					}
				}
			]
		});		
	};

	var changeSku = function(){
		// CAMBIO DE SKU VTEX
		$(window).on("vtex.sku.changed", function (a){
			porcentajeDescuento();
			validarStockDisponible();
		});

		// CAMBIO DE IMAGEN SEGÚN COLOR
		$(window).on("skuDimensionChanged.vtex ", function (event, productId,  nombreDimension, valorDimension){
			console.log("skuDimensionChanged.vtex");

			if( nombreDimension.indexOf("Color") >= 0 ){
				var skuIdParaCambioImagen = -1;
				for( var i = 0; i < skuJson.skus.length && skuIdParaCambioImagen == -1 ; i++){
					if( skuJson.skus[i].available && skuJson.skus[i].dimensions[nombreDimension] == valorDimension ){
						skuIdParaCambioImagen = skuJson.skus[i].sku;
					}
				}

				if(skuIdParaCambioImagen != -1){
					// Se encontro sku para cambio de imagen
					buscarImagenes(skuIdParaCambioImagen);
				}
			}
		});


		var skuUpdateProductImageListener = new Vtex.JSEvents.Listener('updateProductImage', function($objectEvent){
			// console.log("skuUpdateProductImageListener");
		var newSkuId = $objectEvent.newSkuId;
		var skuActual = null;
			for( var i = 0; i < skuJson.skus.length && skuActual == null; i ++){
				if( newSkuId == skuJson.skus[i].sku){
					skuActual = skuJson.skus[i];
					var color = skuActual.dimensions["Color"];
					var talla = skuActual.dimensions["Talla"];

					// buscarImagenes(newSkuId);

					var inputColor = $(".group_0 input[data-value='" + color + "']");
					inputColor.trigger("click");

					var inputTalla = $(".group_1 input[data-value='" + talla + "']");
					inputTalla.trigger("click");

				}
			}
		});

		skuEventDispatcher.addListener(skuSelectionChangedEventName, skuUpdateProductImageListener);
	};

	var ajusteEstructuraMobile = function(){

		//ESTRUCTURACION MOBILE
		$('.contNameProduct').insertBefore('.contImage');
		$('.contNameProduct .nameProd').append($('.shareSocial'));

		$('.contPrice').insertAfter('.contNameProduct');
		$('.contPrice').append('<a href="#ancorComprar" class="comprarAncor"><div class="bgComprarAncor"></div><p>Comprar</p></a>')

		$('.contImage').append($('.contentTags'));
		$('.contImage').append('<div id="ancorComprar"></div>');

		$('.addWishList').insertBefore('.containerSkus');

		//SCROLL ANCORS
		$('.comprarAncor').click(function(){
		    $('html, body').animate({
		        scrollTop: $( $.attr(this, 'href') ).offset().top
		    }, 500);
		    return false;
		});

		//ABRIR - CERRAR SHARE MOBILE
		$('.iconShare').click(function(){
			$(this).next('.redesShare').toggleClass('openRedesShare');
		});

		//STIKY PRECIO
		var topPrecio = $('.contPrice').offset();
		var headerMobil = $('.headerMobil').outerHeight();
		$(window).scroll(function(){
        	var altoNavegador = $(window).height();
	        if ($(window).scrollTop() > topPrecio.top){
	        	$('.contPrice').addClass('stikyPrecio').css('top',headerMobil);
	        	$('.contNameProduct').css('margin-bottom','80px');
	        }else{
	        	$('.contPrice').removeClass('stikyPrecio').css('top','0');
	        	$('.contNameProduct').css('margin-bottom','0');
	        }
	    });
	};

	//CREAR SLIDER DE IMAGENES DE PRODUCTO
	var buscarImagenes = function(skuId){
	    if( skuImages.hasOwnProperty(skuId) ){
			console.log("Ya se tiene el arreglo de images para el sku: " + skuId);
			printSliderImages(skuImages[skuId]);
		} else{
			$.ajax({
	          url: "/produto/sku/" + skuId,
	          method: "get"
	        }).done(function(data){
	            if( typeof data !== "undefined" && data.length > 0 ){
	            	var imagesArray = data[0].Images;
		        	skuImages[data[0].Id] = imagesArray;
		            printSliderImages(imagesArray);

		        }
		        else{
		            console.info("No se encontraron imagenes para el producto");
		        }	            
	        }).fail(function(error){
	            console.log(error);
	        });
		}   
	};

	var thumbsToLoad = 0;
	var thumbsLoaded = 0;
	var thumbLoaded = function(){
		thumbsLoaded++;
		if( thumbsToLoad == thumbsLoaded ){
	    	
	    	var altoSlider = $('.contImage .imagesProduct .sliderImageProduct img').first().height();
			$('.contImage').height(altoSlider);
			$('.contImage').css('overflow','hidden');
			$('.contImage .imagesProduct').height(altoSlider);
			$('.contImage .imagesProduct').css('overflow','hidden');
			console.info(altoSlider);
			ejecutarSliders();

    		// ejecutarSliders();

		    // $('.contImage .imagesProduct .sliderImageProduct').find('.slick-list').height(altoSlider);

		    // $('.contImage .imagesProduct .sliderImageProductThumbs').find('.slick-list').height(altoSlider);
		}
	};

	var printSliderImages = function(imagesArray){
    	if(!$('.sliderImageProduct').is(':empty') && !$('.sliderImageProductThumbs').is(':empty')){
	    	$('.sliderImageProduct.slick-initialized').slick('unslick');
	    	$('.sliderImageProductThumbs.slick-initialized').slick('unslick');

			$('.contImage .imagesProduct .sliderImageProduct').empty();
			$('.contImage .imagesProduct .sliderImageProductThumbs').empty();
    	}

		var imagesSliderBig   = '';
		var imagesSliderSmall = '';

		thumbsToLoad = imagesArray.length;
		thumbsLoaded = 0;
		
		var j = 0;
		var imagenesSliderProducto = [];
    	$.each(imagesArray,function(index,value){
    		imagenesSliderProducto[index] = {
				'bigImage'   : '',
				'smallImage' : '',
				'zoomImage'  : ''
    		};
    		$.each(value,function(i,v){
    			if(v.ArchiveTypeId == 2){
					imagenesSliderProducto[index].bigImage = v.Path.replace('-292-292','-1000-1000');
    			}

    			if(v.ArchiveTypeId == 3){
    				imagenesSliderProducto[index].smallImage = v.Path.replace('-120-120','-300-300');
    			}

    			if(v.ArchiveTypeId == 10){
    				imagenesSliderProducto[index].zoomImage = v.Path.replace('-1000-1000','-2000-2000');
    			}
	    	})
    	});

		$.each(imagenesSliderProducto,function(indexImages,valueImages){
            imagesSliderBig   += '<li class="easyzoom zoomFly">';
            imagesSliderBig   += 	'<a data-zoomimage="'+valueImages.zoomImage+'">';
            imagesSliderBig	  += 		'<img onload="this.onload = null; FuncionalidadesProducto.thumbLoaded();" onerror="this.onerror = null; $(this).parent().remove(); FuncionalidadesProducto.thumbLoaded();" src="'+valueImages.bigImage+'" alt="'+skuJson.name+' Quarry Jeans" />'
            imagesSliderBig	  += 	'</a>'
            imagesSliderBig	  += '</li>'

            imagesSliderSmall += '<li>';
            imagesSliderSmall += 	'<img onload="this.onload = null; FuncionalidadesProducto.thumbLoaded();" onerror="this.onerror = null; $(this).parent().remove(); FuncionalidadesProducto.thumbLoaded();" src="'+valueImages.smallImage+'" alt="'+skuJson.name+' Quarry Jeans" />';
            imagesSliderSmall += '</li>';

		});

    	$('.contImage .imagesProduct .sliderImageProduct').append(imagesSliderBig);
    	$('.contImage .imagesProduct .sliderImageProductThumbs').append(imagesSliderSmall);

    	if ($(window).width() > 1024){
	    	var $easyzoom = $('.easyzoom').easyZoom({
				linkAttribute :'data-zoomimage',
				loadingNotice :'CARGANDO IMAGEN',
				errorNotice   :'IMAGEN NO ENCONTRADA'
			});
    	};

   	};
	
	//EJECUTAR CARRUSEL Y SLIDER DE IMAGENES
	var ejecutarSliders = function(){
		// console.log('entró a ejecutar');

	    // SLIDER DE IMAGENES PRODUCTO THUMBS
	    $('.contImage .imagesProduct .sliderImageProductThumbs').slick({
	        slidesToShow: 4,
	        slidesToScroll: 1,
	        arrows: false,
	        // prevArrow: '<a class="slick-prev"></a>',
	        // nextArrow: '<a class="slick-next"></a>',
	        asNavFor: '.sliderImageProduct',
	        vertical: true,
	        verticalSwiping: true,
	        focusOnSelect: true
	    });

	    //SLIDER DE IMAGENES PRODUCTO
	    $('.contImage .imagesProduct .sliderImageProduct').slick({
	        slidesToShow: 1,
	        slidesToScroll: 1,
	        arrows: true,
	        prevArrow: '<a class="slick-prev"></a>',
	        nextArrow: '<a class="slick-next"></a>',
	        vertical: true,
	        verticalSwiping: true,
	        asNavFor: '.sliderImageProductThumbs',
	        responsive: [
	            {
	                breakpoint: 1023,
	                settings: {
	                    dots:true,
	                    slidesToShow: 1,
	                    vertical: false,
	                    verticalSwiping: false
	                }
	            },
	            {
	                breakpoint: 767,
	                settings: {
	                    arrows: false,
	                    dots:true,
	                    slidesToShow: 1,
	                    vertical: false,
	                    verticalSwiping: false
	                }
	            }
	        ]
	    });

	};

	//CALCULAR DECUENTO DE LA PRENDA
	var porcentajeDescuento = function(){
	    var precio1 = $('.contPrice').find('.skuListPrice').text().replace("$","").replace(".","").replace(",","");
	    var precio2 = $('.contPrice').find('.skuBestPrice').text().replace("$","").replace(".","").replace(",","");
	    if(precio1.length >= 1){
	        var descuento = precio1-precio2;
	        var porcentaje = (descuento*100)/precio1;
	        porcentaje = Math.round(porcentaje);
	        if(precio1 != precio2){
	            $('.contNameProduct').find('.discoutProd span').empty().text('' + porcentaje +'%');
	            $('.contNameProduct').find('.discoutProd').show();
	        }
	    }
	};

	//CONTROL DE SUMAR Y RESTAR PRENDA
	var controlesCantidad = function(){
	    var contentCantidad = $('.contCantidad');

	    var quantityInput = $('.buttonContainer').find('.buy-in-page-quantity');
	    contentCantidad.find(".control.restar").after(quantityInput);

	    var inputCatidad = contentCantidad.find('.buy-in-page-quantity')
	    var controladorMas = contentCantidad.find(".control.sumar");
	    var controladorMenos = contentCantidad.find(".control.restar");

	    controladorMas.on('click', function(){
	        var hrefBotonComprar = $('.buttonContainer .buy-in-page-button').attr('href');
	        var skuActual = FuncionalidadesGenerales.getParameterByName(hrefBotonComprar,'sku');
            var stockActual = skuJson.skus;

            $.each(stockActual,function(indexStock,valueStock){
            	if(valueStock.sku == skuActual){
            		stockActual = valueStock.availablequantity;
            		var qtyActual = inputCatidad.attr('value');
            		 if(qtyActual < stockActual){
    		            qtyActual = parseInt(qtyActual);
    		            qtyActual++;
    		            inputCatidad.attr('value', qtyActual);
    		        }

            	}
            });
	       
	    });

	    controladorMenos.on('click', function(){
	        var qtyActual = inputCatidad.attr('value');
	        qtyActual--;
	        if(qtyActual == 0){
	            qtyActual = 1;
	        }
	        inputCatidad.attr('value', qtyActual);

	    });
	};

	//VALIDA EL STOCK DIPONIBLE DE LA PRENDA
	var validarStockDisponible = function(){
	    var hrefBotonComprar = $('.buttonContainer .buy-in-page-button').attr('href');
	    if(  hrefBotonComprar.indexOf('javascript:alert') == -1 ){

	        var idSku = FuncionalidadesGenerales.getParameterByName(hrefBotonComprar,'sku');

	        var sku = undefined;

	        for(var i = 0; i < skuJson.skus.length; i++){
	            var skuActual = skuJson.skus[i];
	            if(skuActual.sku == idSku){
	                sku = skuActual;
	            }
	        }
	        // console.log(sku.availablequantity);
	        if( typeof sku !== 'undefined' ){
    	        var mensajeStock = '';

    	        if(sku.available){
    	            if( sku.availablequantity == 1){
    	                // console.log('hay ' + sku.availablequantity + '');
    	                mensajeStock = 'Última Disponible';
    	                $('.contCantidad .ultimaUidad').empty().text(mensajeStock);
    	                $('.contCantidad .ultimaUidad').show();
    	            }
    	            else{
    	            	if( sku.availablequantity < 6){
    	            	    // console.log('hay ' + sku.availablequantity + '');
    	            	    mensajeStock = 'Últimas <strong>' + sku.availablequantity + '</strong> Disponibles';
    	            	    $('.contCantidad .ultimaUidad').empty().append(mensajeStock);
    	            	    $('.contCantidad .ultimaUidad').show();
    	            	}
    	            	else{
    	    	        	$('.contCantidad .ultimaUidad').hide();
    	    	        }
    	            }
    	        }
    	    }

	    }
	};

	//FUNCIONALIDAD GUIA DE TALLAS
	var funcionalidadGuiaTallas = function(){	

		$('.contentInfoProducto .containerSkus .guiaTallas').click(function(){
			
			$('#selectGender').change(function(){
				var genderSelectVal = $(this).val();
				$('.selectTallas').each(function(i,v){
					if ($(this).data('genero') == genderSelectVal) {

						$('.contentTableDinamic').hide();
						$('.selectTallas').val('').trigger('change');
						$('.selectTallas').hide();
						$('#lightboxGuiaTallas .innerContentTallas .contentImage').hide();
						$('#lightboxGuiaTallas .innerContentTallas .contentImage img').hide();
						$(this).show();
						$('#lightboxGuiaTallas .innerContentTallas .contentImage').show();
						$('#lightboxGuiaTallas .innerContentTallas .contentImage').find('img[data-genero="' + genderSelectVal + '"]').show();
					}
					else {
						if(genderSelectVal == ''){
							$('.contentTableDinamic').hide();
							$('.selectTallas').hide();
							$('#lightboxGuiaTallas .innerContentTallas .contentImage').hide();
							$('#lightboxGuiaTallas .innerContentTallas .contentImage img').hide();
						}
					}
				});
			});

			$('.selectTallas').change(function(){
				var tallaSelectVal = $(this).val();
				$('.contentTableDinamic').each(function(i,v){
					if ($(v).data('talla') == tallaSelectVal) {
						$('.contentTableDinamic').hide();
						$(this).show();
					}
					else {
						if(tallaSelectVal == ''){
							$('.contentTableDinamic').hide();
						}
					}
				});
			});

			$('.blackBoxGuiaTallas').fadeIn();
		});
		$('#lightboxGuiaTallas').click(function(event){
			event.stopPropagation();
		});

		$('#lightboxGuiaTallas .cerrar').click(function(){
			$('.blackBoxGuiaTallas').fadeOut();
		});

		$('.blackBoxGuiaTallas').click(function(){
			$(this).fadeOut();
		});
	};

	var cambioColorSkuTextura = function(){
		$('.skuProductoSTF .sku-selector-container .Printcolor .item-dimension-Printcolor span .dimension-Printcolor').each(function(i,v){
			$(this).css('background','url(/arquivos/'+$(v).text()+'.jpg)');
		});
	};

	return{
		init        : init,
		thumbLoaded : thumbLoaded
	}

}();

var AgregarProducto = function () {
	var init = function(){
		agregarAlCarrito();
	};

	var addProductToCart = function(idSku, qty){
		var urlAddToCart = "/checkout/cart/add?sku=" + idSku + "&qty=" + qty + "&seller=1&redirect=false&sc=1";
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
						$('.faltanteEnvioGratisText .itemsResumen .faltanteEnvio').text('$' + valorRestanteFree + '.00');
						$('.contentEnvioGratis .contadorEnvio .porcentCounter').text(porcentajeFree+ '%');
						$('.contentEnvioGratis .contadorEnvio .bgCounter').css('width', porcentajeFree+'%');
						if(porcentajeFree >= 40){
							$('.contentEnvioGratis .contadorEnvio .porcentCounter').addClass('porcentCounterFull');
						}
					}
					else{
						$('.faltanteEnvioGratisText .itemsResumen').addClass('itemResumenFull').empty().text('¡Tu envío será gratuito!');
						$('.contentEnvioGratis .contadorEnvio .porcentCounter').text('100%').addClass('porcentCounterFull');
						$('.contentEnvioGratis .contadorEnvio .bgCounter').css('width', '100%');
					}


					$('.buy-in-page-button').css('pointer-events','initial');
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

	var agregarAlCarrito = function(){

		$('.dimension-Color').click(function(){
			$('.buttonContainer').find('h3.errorSkuProductoColor').remove();
		});
		
		$('.dimension-Talla').click(function(){
			$('.buttonContainer').find('h3.errorSkuProductoTalla').remove();
		});

		$('.buy-in-page-button').click(function(e){
			try{

				if ($(".group_0 label").length > 1 /*&& $(".group_1 label").length > 1*/) {
					if ($('.sku-selector-container .Color .checked').length < 1) {
						$('.buttonContainer').find('h3.errorSkuProductoColor').remove();
						$('<h3 class="errorSkuProductoColor errorSku">Selecciona el color</h3>').insertBefore('.buy-in-page-button');
						throw 'No se ha seleccionado el color';
					}
					if ($('.sku-selector-container .Talla .checked').length < 1) {
						$('.buttonContainer').find('h3.errorSkuProductoTalla').remove();
						$('<h3 class="errorSkuProductoTalla errorSku">Selecciona la talla</h3>').insertBefore('.buy-in-page-button');
						throw 'No se ha seleccionado la talla';
					}
				}

				e.preventDefault();

				$(this).css('pointer-events','none');

				var href  = $(this).attr('href');
				var idSku = FuncionalidadesGenerales.getParameterByName(href, "sku");
				var qty   = $('.buy-in-page-quantity').val();
				

				vtexjs.catalog.getCurrentProductWithVariations().done(function(product){
					$('.blackboxCart').fadeIn();
				    $('#lightboxCart .itemAgregado .imageItem img').attr('alt',product.name);
				    $.each(product.skus,function(indexSku,valueSku){
				    	if (valueSku.sku == idSku) {
				    		$('#lightboxCart .itemAgregado .imageItem img').attr('src',valueSku.image);
				    		$('#lightboxCart .infoItem .price').text(valueSku.bestPriceFormated);
				    		$('#lightboxCart .infoItem .quantity .unidadesItem').text((qty > 1)?'Unidades':'Unidad');
				    		$('#lightboxCart .infoItem .quantity .quantityItem').text(qty);
				    	}
				    });
				});
				addProductToCart(idSku,qty);
			}
			catch(e){
				console.log('ERROR: '+ e);
			}
		});
	};

	return{
		init:init
	}

}();

$(document).ready(function(){
	// FuncionalidadesProducto.init();
	// AgregarProducto.init();
});

