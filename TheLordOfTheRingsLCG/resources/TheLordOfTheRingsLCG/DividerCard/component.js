/* COMPONENT CONFIGURATION */
const Card = 'DividerCard' ;
const CardVersion = 1 ;
// 1: rewrite using new 2020 library
// TemplateList is expanded in code with the CollectionList,
// so it's defined as variable.
// Each Collection has 2 $settings defining the colours used
// in the product box.
var TemplateList = new Array( 'Collection' , 'Custom' ) ;

function create( diy ){
	diy.extensionName = 'TheLordOfTheRingsLCG.seext' ;
	diy.version = LibraryVersion+CardVersion ;
	$VersionHistory = diy.version ;
	
	loadSettings( diy ) ;
	loadExample( diy ) ; 

	diy.frontTemplateKey = 'Template' ;
	diy.backTemplateKey = 'Template' ;
	diy.faceStyle = FaceStyle.TWO_FACES ;
	diy.bleedMargin = 9 ;
	
	diy.customPortraitHandling = true ;
	createPortrait( 'Portrait' , diy ) ;
	createPortrait( 'Collection' , diy ) ;
	createPortrait( 'EncounterSet' , diy ) ;
	$PortraitListCount = getPortraitCount() ;
}

function createInterface( diy, editor, sheet ){
	var bindings = new Bindings( editor , diy ) ;
	
// RULES TAB
	var Main_tab = new Grid() ;
	Main_tab.editorTabScrolling = true ;
		
	let Title_panel = new Grid() ;
	Title_panel.setTitle( @LRL-Title-panel ) ;
	uiName( diy , bindings ) ;
	Title_panel.place(
		diy.nameField , 'growx'
	) ;
	Main_tab.place( Title_panel , 'newline,growx' ) ;
	
	let EncounterSet_panel = new Grid() ;
	EncounterSet_panel.setTitle( @LRL-EncounterSet-panel ) ;
	EncounterSet_control = new uiIconList( 'EncounterSet' , GO.DefaultIconList.concat( GO.EncounterSetList ) , bindings ) ;
	EncounterSetPortrait_control = new uiPortrait( 'EncounterSet' , diy ) ;
	EncounterSet_panel.place(
		EncounterSet_control , 'growx' ,
		EncounterSetPortrait_control , 'newline,growx'
	) ;
	Main_tab.place( EncounterSet_panel , 'newline,growx' ) ;

	let Collection_panel = new Grid() ;
	Collection_panel.setTitle( @LRL-Collection-panel ) ;
	Collection_control = new uiIconList( 'Collection' , GO.DefaultIconList.concat( GO.CollectionList ) , bindings ) ;
	CollectionPortrait_control = new uiPortrait( 'Collection' , diy ) ;
	Collection_panel.place(
		Collection_control , 'growx' ,
		CollectionPortrait_control , 'newline,growx'
	) ;
	Main_tab.place( Collection_panel , 'newline,growx' ) ;
	
	Main_tab.addToEditor( editor , @LRL-Main-tab ) ;
	
// TEMPLATE TAB
	var Template_tab = new Grid() ;
	Template_tab.editorTabScrolling = true ;

	let Template_panel = new Grid() ;
	Template_panel.setTitle( @LRL-Template-panel ) ;
	Template_control = new uiIconList( 'Template' , TemplateList , bindings ) ;
	Template_panel.place(
		Template_control , 'growx'
	) ;
	Template_tab.place( Template_panel , 'newline,growx' ) ;
	
	TemplateTint_control = new uiTint( 'Template-out' , bindings ) ;
	TemplateTint_control.title = @LRL-TemplateTint-uiTint ;
	TemplateTextTint_control = new uiTint( 'Template-in' , bindings ) ;
	TemplateTextTint_control.title = @LRL-TemplateTextTint-uiTint ;
	Template_tab.place(
		TemplateTint_control , 'newline,growx' ,
		TemplateTextTint_control , 'newline,growx'
	) ;
	
	let TemplateAdvanced_panel = new Grid() ;
	TemplateAdvanced_panel.setTitle( @LRL-TemplateAdvanced-panel ) ;
	ShowCut_control = new uiButtonText( 'ShowCut' , diy , bindings , [FRONT,BACK] ) ;
	ShowCutBigger_control = new uiButtonText( 'ShowCutBigger' , diy , bindings , [FRONT,BACK] ) ;
	ShowBleeding_control = new uiButtonText( 'ShowBleeding' , diy , bindings , [FRONT,BACK] ) ;
	TemplateAdvanced_panel.place(
		@LRL-CutPreview , 'split' ,
		ShowCut_control , '',
		ShowCutBigger_control , '',
		ShowBleeding_control ,''
	) ;
	Template_tab.place( TemplateAdvanced_panel , 'newline,growx' ) ;
	
	Template_tab.addToEditor( editor , @LRL-Template-tab ) ;
	
// PORTRAIT TAB
	var Portrait_tab = new Grid() ;
	Portrait_tab.editorTabScrolling = true ;
	
	let Portrait_panel = new Grid() ;
	Portrait_panel.setTitle( @LRL-Portrait-panel ) ;
	Portrait_control = new uiPortrait( 'Portrait' , diy ) ;
	PortraitMirror_control = new uiPortraitMirror( 'Portrait' , Portrait_control ) ;
	Artist_control = new uiText( 'Artist' , bindings ) ;
	Portrait_panel.place(
		@LRL-Artist , 'split' ,
		Artist_control , 'growx' ,
		Portrait_control , 'newline,growx' ,
		PortraitMirror_control , 'newline,growx' 
	) ;
	Portrait_tab.place( Portrait_panel , 'newline,growx' ) ;
	
	Portrait_tab.addToEditor( editor , @LRL-Portrait-tab ) ;

// COLLECTION TAB
	
	bindings.bind() ;
	
}

function createFrontPainter( diy, sheet ){

// TEMPLATE
	TemplateIn_tinter = new createTinterVariable( CardPath+'Custom-in.jp2' , diy ) ;
	TemplateOut_tinter = new createTinterVariable( CardPath+'Custom-out.jp2' , diy ) ;

// STATS

// TEXT
	Name_writer = new createTextBox( 'Name' , diy , sheet ) ;
	Name_writer.setLineTightness( 10 ) ;
	Bottom_writer = new createTextBox( 'Bottom' , diy , sheet ) ;

	updateExternalPortrait( 'Portrait' , diy ) ;
	updateExternalPortrait( 'Collection' , diy ) ;
	updateExternalPortrait( 'EncounterSet' , diy ) ;
}

function createBackPainter( diy, sheet ){
/*
	Even if elements are drawn in the back side of the component,
	we don't need to define anything here, because we'll be using
	the same elements already defined in createFrontPainter.
*/
	debug( 1 , 'createBackPainter' ) ;
}

function paintCommon( g , diy , sheet ){
	paintPortrait( 'Portrait' , g , diy , sheet ) ;
	
// TEMPLATE
	var tintIn ;
	var tintOut ;
	if( $Template == 'Custom' ){
		tintIn = diy.settings.getTint( 'Template-in' ) ;
		tintOut = diy.settings.getTint( 'Template-out' ) ;
	}else{
		tintIn = diy.settings.getTint( $Collection ) ;
		tintOut = diy.settings.getTint( $Collection+'-out' ) ;
	}
	TemplateIn_tinter.setFactors( tintIn[0] , tintIn[1] , tintIn[2] ) ;
	sheet.paintImage( g , TemplateIn_tinter.getTintedImage() , 'Template' ) ;
	
	TemplateOut_tinter.setFactors( tintOut[0] , tintOut[1] , tintOut[2] ) ;
	sheet.paintImage( g , TemplateOut_tinter.getTintedImage() , 'Template' ) ;
	
	sheet.paintTemplateImage( g ) ;	
	
// TEXT
	writeTextOutlined( 
		$Name , Name_writer , 
		diy.settings.getRegion( 'Name' ) , selectStroke( 'Name-stroke' , diy ) , 
		g , sheet , diy 
	) ;
	switch( $Artist ){
	case 'no' :
		text = '' ; 
		break ;
	case '' : 
		if( diy.settings.get( 'LRL-IllustratorUnknown' , '' ) != '' ) text = $LRL-IllustratorUnknown ; 
		else text = #LRL-IllustratorUnknown ; 
		break ;
	default : 
		if( diy.settings.get( 'LRL-IllustratorShort' , '' ) != '' ) text = $LRL-IllustratorShort+' '+$Artist ;
		else text = #LRL-IllustratorShort+' '+$Artist ;
	}
	writeTextOutlined( 
		text , Bottom_writer , 
		diy.settings.getRegion( 'Artist' ) , selectStroke( 'Bottom-stroke' , diy ) , 
		g , sheet , diy 
	) ;
}
function paintFront( g , diy , sheet ){
	paintCommon( g , diy , sheet ) ;
// ICONS
	sheet.paintImage(
		g ,
		ImageUtils.get( 'TheLordOfTheRingsLCG/image/SetDecoration.jp2' ) ,
		'Collection-deco'
	) ;
	paintIcon( 'Collection' , g , diy , sheet ) ;
	
	sheet.paintImage(
		g ,
		ImageUtils.get( 'TheLordOfTheRingsLCG/image/SetDecoration.jp2' ) ,
		'EncounterSet-deco'
	) ;
	paintIcon( 'EncounterSet' , g , diy , sheet ) ;
	
	paintCut( g , diy , sheet ) ;
}

function paintBack( g , diy , sheet ){
	paintCommon( g , diy , sheet ) ;
// ICONS
	sheet.paintImage(
		g ,
		ImageUtils.get( 'TheLordOfTheRingsLCG/image/SetDecoration.jp2' ) ,
		'Collection-deco-back'
	) ;
	sheet.paintImage(
		g ,
		getIcon( 'Collection' ) ,
		'Collection-back'
	) ;
	
	sheet.paintImage(
		g ,
		ImageUtils.get( 'TheLordOfTheRingsLCG/image/SetDecoration.jp2' ) ,
		'EncounterSet-deco-back'
	) ;
	sheet.paintImage(
		g ,
		getIcon( 'EncounterSet' ) ,
		'EncounterSet-back'
	) ;
	
	paintCut( g , diy , sheet ) ;
}

if( sourcefile == 'Quickscript' ){
	Settings.shared.addSettingsFrom( 'project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/LRL.settings' ) ;
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
