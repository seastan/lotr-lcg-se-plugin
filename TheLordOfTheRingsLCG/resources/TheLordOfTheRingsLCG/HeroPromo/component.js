const Card = 'HeroPromo' ; 
// a\u00f1adir gr\u00e1ficos de distinto tama\u00f1o para texto
// a\u00f1adir decoracion opcional a estadisticas
const CardVersion = 1 ;
// 1: rewrite using new 2020 library

const TemplateList = new Array(
) ;

function create( diy ){
}

function createInterface( diy , editor , sheet ){
}

function createFrontPainter( diy , sheet ){
}

function createBackPainter( diy, sheet ){ 
}

function paintFront( g , diy , sheet ){ 
}

function paintBack( g, diy, sheet ){ 
}

if( sourcefile == 'Quickscript' ){
	Settings.shared.addSettingsFrom( 'project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/LRL.settings' ) ;
	Settings.shared.addSettingsFrom( 'project:TheLordOfTheRingsLCG-B/resources/TheLordOfTheRingsLCG/LRL-B.settings' ) ;
	Settings.shared.addSettingsFrom( 'project:TheLordOfTheRingsLCG-I/resources/TheLordOfTheRingsLCG/LRL-I.settings' ) ;

	useLibrary( 'project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/LRL.js' ) ;
	Eons.namedObjects.LRL = new gameObject() ;
	useLibrary( 'project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/library.js' ) ;
	GameLanguage.addStrings( 'project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/text/game' ) ;
	InterfaceLanguage.addStrings( 'project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/text/interface' ) ;
	InterfaceLanguage.addStrings( 'project:TheLordOfTheRingsLCG-I/resources/TheLordOfTheRingsLCG/text/icons' ) ;	

	testDIYScript( 'LRL' ) ;
}else{
	useLibrary( 'res://TheLordOfTheRingsLCG/library.js' ) ;
}
