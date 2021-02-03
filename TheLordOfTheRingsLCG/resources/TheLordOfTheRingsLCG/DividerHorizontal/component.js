const Card = 'DividerHorizontal' ;
// no carga iconos de ejemplo
const CardVersion = 1 ;
// 1: rewrite using new 2020 library
const TemplateList = new Array(
	'Encounter'
	, 'Player'
) ;

function create( diy ){
	diy.extensionName = 'TheLordOfTheRingsLCG.seext' ;
	diy.version = LibraryVersion+CardVersion ;
	$VersionHistory = diy.version ;
	
	loadSettings( diy ) ;
	loadExample( diy ) ;
	
	diy.frontTemplateKey = 'Template' ;
	diy.backTemplateKey = 'TemplateBack' ;
	diy.faceStyle = FaceStyle.TWO_FACES ;
	diy.bleedMargin = 0 ;
	
	diy.customPortraitHandling = true ;
	createPortrait( 'Portrait' , diy ) ;
	createPortrait( 'Collection' , diy ) ;
	createPortrait( 'EncounterSet' , diy ) ;
	$PortraitListCount = getPortraitCount() ;
}

function createInterface( diy , editor , sheet ){
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

	iconList = GO.DefaultIconList ;
	iconList = iconList.concat( GO.FullIconList ) ;
	
	let EncounterSet_panel = new Grid() ;
	EncounterSet_panel.setTitle( @LRL-EncounterSet-panel ) ;
	EncounterSet_control = new uiIconList( 'EncounterSet' , iconList , bindings , [FRONT,BACK] ) ;
	EncounterSetPortrait_control = new uiPortrait( 'EncounterSet' , diy ) ;
	EncounterSet_panel.place(
		EncounterSet_control , 'growx' ,
		EncounterSetPortrait_control , 'newline,growx'
	) ;
	Main_tab.place( EncounterSet_panel , 'newline,growx' ) ;

	let Collection_panel = new Grid() ;
	Collection_panel.setTitle( @LRL-Collection-panel ) ;
	Collection_control = new uiIconList( 'Collection' , iconList , bindings , [FRONT,BACK] ) ;
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
	
	Template_control = new uiIconList( 'Template' , TemplateList , bindings , [FRONT,BACK] ) ;
	IconLayout_control = new uiCycler( 
		'Layout' ,
		[ 'Title' , 'Left' , 'LeftMiddle' , 'RightMiddle' , 'Right' ] ,
		bindings , [FRONT,BACK]
	);
	IconSwap_control = new uiButtonText( 'IconSwap' , diy , bindings , [BACK] ) ;
	let Template_panel = new Grid() ;
	Template_panel.setTitle( @LRL-Template-panel ) ;
	Template_control = new uiIconList( 'Template' , TemplateList , bindings ) ;
	TemplateTint_control = new uiTint( 'Template' , bindings , [FRONT,BACK] ) ;
	TemplateTint_control.title = @LRL-TemplateTint-uiTint ;
	Template_panel.place(
		@LRL-Template, 'newline,split' ,
		Template_control , 'growx' ,
		@LRL-uiIconList-IconLayout, 'newline,split' ,
		IconLayout_control , '' ,
		IconSwap_control , '' ,
		TemplateTint_control , 'newline,growx'
	) ;
	Template_tab.place( Template_panel , 'newline,growx' ) ;
	
	let TemplateAdvanced_panel = new Grid() ;
	TemplateAdvanced_panel.setTitle( @LRL-TemplateAdvanced-panel ) ;
	ShowCut_control = new uiButtonText( 'ShowCut' , diy , bindings , [FRONT,BACK] ) ;
	ShowCutBig_control = new uiButtonText( 'ShowCutBig' , diy , bindings , [FRONT,BACK] ) ;
	ShowBleeding_control = new uiButtonText( 'ShowBleeding' , diy , bindings , [FRONT,BACK] ) ;
	TemplateAdvanced_panel.place(
		@LRL-CutPreview , 'split' ,
		ShowCut_control , '',
		ShowCutBig_control , '',
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
	Artist_control = new uiText( 'Artist' , bindings , [FRONT,BACK] ) ;
	Portrait_panel.place(
		@LRL-Artist , 'split' ,
		Artist_control , 'growx' ,
		Portrait_control , 'newline,growx' ,
		PortraitMirror_control , 'newline,growx' 
	) ;
	Portrait_tab.place( Portrait_panel , 'newline,growx' ) ;
	
	Portrait_tab.addToEditor( editor , @LRL-Portrait-tab ) ;
	
	bindings.bind() ;
}

function createFrontPainter( diy, sheet ){

// TEMPLATE
	TemplateTint_tinter = new createTinterVariable( CardPath+'Custom.jp2' , diy ) ;

// STATS

// TEXT
	Name_writer = new createTextBox( 'Name' , diy , sheet ) ;
	Bottom_writer = new createTextBox( 'Bottom' , diy , sheet ) ;

	updateExternalPortrait( 'Portrait' , diy ) ;
	updateExternalPortrait( 'Collection' , diy ) ;
	updateExternalPortrait( 'EncounterSet' , diy ) ;
}

function createBackPainter(diy,sheet){
}

function paintCommon( g , diy , sheet ){
	paintPortrait( 'Portrait' , g , diy , sheet ) ;
	
// TEMPLATE
	var tint = diy.settings.getTint( 'Template' ) ;
	TemplateTint_tinter.setFactors( tint[0] , tint[1] , tint[2] ) ;
	sheet.paintImage( g , TemplateTint_tinter.getTintedImage() , 'Template' ) ;
	
	paintTemplate( g , sheet ) ;
	
// TEXT
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
	
	if( diy.settings.getBoolean( 'ShowBleeding' ) ) sheet.paintImage( g , 'Template-Bleeding' , 'Template' ) ;
}

function paintFront( g , diy , sheet ){
	paintCommon( g , diy , sheet ) ;

	switch( String($Layout) ){
	case 'Title' :
		sheet.paintImage( g , $Template+'-TitleLeft' , 'Template' ) ;
		sheet.paintImage( g , getIcon( 'EncounterSet' ) , 'Icon-TitleLeft' ) ;
		sheet.paintImage( g , getIcon( 'Collection' ) , 'Icon-TitleRight' ) ;
		writeName( g , diy ) ;
		break ;
	default :
		sheet.paintImage( g , $Template+'-'+$Layout , 'Template' ) ;
		sheet.paintImage( g , getIcon( 'EncounterSet' ) , 'Icon-'+$Layout+'-region' ) ;
	}
	if( diy.settings.getBoolean( 'ShowCut' ) ){
		if( $Layout == 'Title' ) sheet.paintImage( g , 'Template-Cut-TitleLeft' , 'Template' ) ;
		else sheet.paintImage( g , 'Template-Cut-'+$Layout , 'Template' ) ;
	}
	if( diy.settings.getBoolean( 'ShowCutBig' ) ){
		if( $Layout == 'Title' ) sheet.paintImage( g , 'Template-CutBig-TitleLeft' , 'Template' ) ;
		else sheet.paintImage( g , 'Template-CutBig-'+$Layout , 'Template' ) ;
	}
	
}

function paintBack( g , diy , sheet ){
	paintCommon( g , diy , sheet ) ;
	
	switch( $Layout ){
	case 'Title' : layout = 'TitleRight' ; break ;
	case 'Left' : layout = 'Right' ; break ;
	case 'LeftMiddle' : layout = 'RightMiddle' ; break ;
	case 'Right' : layout = 'Left' ; break ;
	case 'RightMiddle' : layout = 'LeftMiddle' ; break ;
	}

	switch( $Layout ){
	case 'Title' :
		sheet.paintImage( g , $Template+'-TitleRight' , 'Template' ) ;
		if( diy.settings.getBoolean( 'IconSwap' ) === true ){
			setPosition = 'TitleRight' ;
			colPosition = 'TitleLeft' ;
		}else{
			setPosition = 'TitleLeft' ;
			colPosition = 'TitleRight' ;
		}
		sheet.paintImage( g , getIcon( 'EncounterSet' ) , 'Icon-'+setPosition+'-back' ) ;
		sheet.paintImage( g , getIcon( 'Collection' ) , 'Icon-'+colPosition+'-back' ) ;
		writeLine( 
			$Name , Name_writer , 
			diy.settings.getRegion( 'Name-back' ) , g 
		) ;
		break ;
	default :
		sheet.paintImage( g , $Template+'-'+layout , 'Template' ) ;
		sheet.paintImage( g , getIcon( 'EncounterSet' ) , 'Icon-'+layout ) ;
	}

	if( diy.settings.getBoolean( 'ShowCutBig' ) ) sheet.paintImage( g , 'Template-CutBig-'+layout , 'Template' ) ;
	if( diy.settings.getBoolean( 'ShowCut' ) ) sheet.paintImage( g , 'Template-Cut-'+layout , 'Template' ) ;
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
