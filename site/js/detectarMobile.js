$(document).ready(function(){
	detectarMobile();
});

detectarMobile = function() {
	console.log('entré a detectar');

	var md = new MobileDetect(window.navigator.userAgent), keys = ["iPad", "NexusTablet", "SamsungTablet", "Kindle", "SurfaceTablet", "HPTablet", "AsusTablet", "BlackBerryTablet", "HTCtablet", "MotorolaTablet", "NookTablet", "AcerTablet", "ToshibaTablet", "LGTablet", "FujitsuTablet", "PrestigioTablet", "LenovoTablet", "YarvikTablet", "MedionTablet", "ArnovaTablet", "IntensoTablet", "IRUTablet", "MegafonTablet", "EbodaTablet", "AllViewTablet", "ArchosTablet", "AinolTablet", "SonyTablet", "CubeTablet", "CobyTablet", "MIDTablet", "SMiTTablet", "RockChipTablet", "FlyTablet", "bqTablet", "HuaweiTablet", "NecTablet", "PantechTablet", "BronchoTablet", "VersusTablet", "ZyncTablet", "PositivoTablet", "NabiTablet", "KoboTablet", "DanewTablet", "TexetTablet", "PlaystationTablet", "TrekstorTablet", "PyleAudioTablet", "AdvanTablet", "DanyTechTablet", "GalapadTablet", "MicromaxTablet", "KarbonnTablet", "AllFineTablet", "PROSCANTablet", "YONESTablet", "ChangJiaTablet", "GUTablet", "PointOfViewTablet", "OvermaxTablet", "HCLTablet", "DPSTablet", "VistureTablet", "CrestaTablet", "MediatekTablet", "ConcordeTablet", "GoCleverTablet", "ModecomTablet", "VoninoTablet", "ECSTablet", "StorexTablet", "VodafoneTablet", "EssentielBTablet", "RossMoorTablet", "iMobileTablet", "TolinoTablet", "AudioSonicTablet", "AMPETablet", "SkkTablet", "TecnoTablet", "JXDTablet", "iJoyTablet", "Hudl", "TelstraTablet", "GenericTablet", "iPhone", "BlackBerry", "HTC", "Nexus", "Dell", "Motorola", "Samsung", "LG", "Sony", "Asus", "Micromax", "Palm", "Vertu", "Pantech", "Fly", "iMobile", "SimValley", "GenericPhone", "AndroidOS", "BlackBerryOS", "PalmOS", "SymbianOS", "WindowsMobileOS", "WindowsPhoneOS", "iOS", "MeeGoOS", "MaemoOS", "JavaOS", "webOS", "badaOS", "BREWOS", "Chrome", "Dolfin", "Opera", "Skyfire", "IE", "Firefox", "Bolt", "TeaShark", "Blazer", "Safari", "Tizen", "UCBrowser", "DiigoBrowser", "Puffin", "Mercury", "GenericBrowser", "DesktopMode", "TV", "WebKit", "Bot", "MobileBot", "Console", "Watch"], versionKeys = ["Mobile", "Build", "Version", "VendorID", "iPad", "iPhone", "iPod", "Kindle", "Chrome", "Coast", "Dolfin", "Firefox", "Fennec", "IE", "NetFront", "NokiaBrowser", "Opera", "Opera Mini", "Opera Mobi", "UC Browser", "MQQBrowser", "MicroMessenger", "Safari", "Skyfire", "Tizen", "Webkit", "Gecko", "Trident", "Presto", "iOS", "Android", "BlackBerry", "BREW", "Java", "Windows Phone OS", "Windows Phone", "Windows CE", "Windows NT", "Symbian", "webOS"], content = $(".content"), legend = $(".legend");
	
	console.log( md.mobile() );
	console.log( md.phone() );
	console.log( md.tablet() );
	console.log( md.userAgent() );
	console.log( md.os() );
	console.log( md.is('iPhone') );
	console.log( md.is('bot') );
	console.log( md.version('Webkit') );
	console.log( md.versionStr('Build') );
	console.log( md.match('playstation|xbox') );

	if( md.phone() ){
		console.log('estoy en PHONE');
		$('body').addClass('imPhone');
	}
	else if( md.tablet() ){
		console.log('estoy en TABLET');
		$('body').addClass('imTablet');
	}
	else{
		console.log('estoy en DESKTOP');
	}
}

