const Card = 'Location' ; 
const CardVersion = 1 ;
// 1: rewrite using new 2020 library

const TemplateList = new Array(
	'Standard'
	, 'Nightmare'
) ;
const DifficultyList = new Array( 'Standard' , 'Gold' , 'Red' , 'Green' , 'Blue' , 'Purple' ) ;

function create( diy ){
	diy.extensionName = 'TheLordOfTheRingsLCG.seext' ;
	diy.version = LibraryVersion+CardVersion ;
	$VersionHistory = diy.version ;
	
	loadSettings( diy ) ;
	loadExample( diy ) ; 

	diy.frontTemplateKey = 'Template' ;
	diy.backTemplateKey = 'TemplateBack' ;
	diy.faceStyle = FaceStyle.TWO_FACES ;
	diy.bleedMargin = 9 ;

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
	Unique_control = new uiButtonIcon( 'Unique' , diy , bindings ) ;
	Title_panel.place(
		Unique_control , 'split' , 
		diy.nameField , 'growx'
	) ;
	Main_tab.place( Title_panel , 'newline,growx' ) ;
	
	let Stats_panel = new Grid() ;
	Stats_panel.setTitle( @LRL-Stats-panel ) ;
	Threat_control = new uiStat( 'Threat' , bindings ) ;
	Progress_control = new uiStat( 'Progress' , bindings ) ;
	Stats_panel.place(
		uiIcon( 'Threat' ) , 'split' ,
		Threat_control , 'growx' ,
		uiIcon( 'Progress' ) , '' , 
		Progress_control , 'growx' 
	) ;
	Main_tab.place( Stats_panel , 'newline,growx' ) ;
	
	let Effect_panel = new Grid() ;
	Effect_panel.setTitle( @LRL-Effect-panel ) ;
	Trait_control = new uiText( 'Trait' , bindings ) ;
	Rules_control = new uiParagraph( 'Rules' , bindings ) ;
	Shadow_control = new uiParagraph( 'Shadow' , bindings ) ;
	Flavour_control = new uiParagraph( 'Flavour' , bindings ) ;
	Effect_panel.place(
		@LRL-Trait, 'center' , 
		Trait_control , 'newline,growx' ,
		@LRL-Rules , 'newline,center' , 
		Rules_control , 'newline,growx' ,
		@LRL-Shadow, 'newline,center' , 
		Shadow_control , 'newline,growx' ,
		@LRL-Flavour, 'newline,center' , 
		Flavour_control , 'newline,growx' 
	) ;
	Main_tab.place( Effect_panel , 'newline,growx' ) ;
	
	let EffectAdvanced_panel = new Grid() ;
	EffectAdvanced_panel.setTitle( @LRL-EffectAdvanced-panel ) ;
	OptionLeft_control = new uiText( 'OptionLeft' , bindings ) ;
	OptionRight_control = new uiText( 'OptionRight' , bindings ) ;
	OptionSpecial_control = new uiIconList( 'OptionSpecial' , GO.OptionSpecialList , bindings ) ;
	EffectAdvanced_panel.place(
		@LRL-OptionLeft , 'split' ,
		OptionLeft_control , 'growx',
		@LRL-OptionRight , 'newline,split' ,
		OptionRight_control , 'growx' ,
		@LRL-OptionSpecial , 'newline,split' ,
		OptionSpecial_control, 'growx'
	) ;
	Main_tab.place( EffectAdvanced_panel , 'newline,growx' ) ;

	Main_tab.addToEditor( editor , @LRL-Main-tab ) ;
	
// ENCOUNTER SET TAB
	var EncounterSet_tab = new Grid() ; 
	EncounterSet_tab.editorTabScrolling = true ;
	
	let EncounterSet_panel = new Grid() ;
	EncounterSet_panel.setTitle( @LRL-EncounterSet-panel ) ;
	EncounterSetNumber_control = new uiSpinner( 'EncounterSetNumber' , bindings ) ;
	EncounterSetTotal_control = new uiSpinner( 'EncounterSetTotal' , bindings ) ;
	EncounterSet_control = new uiIconList( 'EncounterSet' , GO.DefaultIconList.concat( GO.EncounterSetList ) , bindings ) ;
	EncounterSetPortrait_control = new uiPortrait( 'EncounterSet' , diy ) ;
	Difficulty_control = new uiIconList( 'Difficulty' , DifficultyList , bindings ) ;
	EncounterSet_panel.place(
		EncounterSet_control , 'growx' ,
		@LRL-Number, 'newline,split' ,
		EncounterSetNumber_control , '' ,
		@LRL-Total,'',
		EncounterSetTotal_control , '' ,
		@LRL-Difficulty, '' ,
		Difficulty_control , 'growx' ,
		EncounterSetPortrait_control , 'newline,growx'
	) ;
	EncounterSet_tab.place( EncounterSet_panel , 'newline,growx' ) ;
	
	EncounterSet_tab.addToEditor( editor , @LRL-EncounterSet-tab ) ;

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
	
	let TemplateAdvanced_panel = new Grid() ;
	TemplateAdvanced_panel.setTitle( @LRL-TemplateAdvanced-panel ) ;
	ShowCut_control = new uiButtonText( 'ShowCut' , diy , bindings , [FRONT,BACK] ) ;
	ShowBleeding_control = new uiButtonText( 'ShowBleeding' , diy , bindings , [FRONT,BACK] ) ;
	TemplateAdvanced_panel.place(
		@LRL-CutPreview , 'split' ,
		ShowCut_control , '',
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
	var Collection_tab = new Grid() ; 
	Collection_tab.editorTabScrolling = true ;
	
	let Collection_panel = new Grid() ;
	Collection_panel.setTitle( @LRL-Collection-panel ) ;
	CollectionNumber_control = new uiSpinner( 'CollectionNumber' , bindings ) ;
	CollectionInfo_control = new uiText( 'CollectionInfo' , bindings ) ;
	Collection_control = new uiIconList( 'Collection' , GO.DefaultIconList.concat( GO.CollectionList ) , bindings ) ;
	CollectionPortrait_control = new uiPortrait( 'Collection' , diy ) ;
	Collection_panel.place(
		Collection_control , 'growx' ,
		@LRL-Number , 'newline,split' ,
		CollectionNumber_control , '' ,
		@LRL-Information , '' ,
		CollectionInfo_control , 'growx' ,
		CollectionPortrait_control , 'newline,growx'
	) ;
	Collection_tab.place( Collection_panel , 'newline,growx' ) ;
	
	let Copyright_panel = new Grid() ;
	Copyright_panel.setTitle( @LRL-Copyright-panel ) ;
	Copyright_control = new uiText( 'Copyright' , bindings ) ;
	Copyright_panel.place(
		Copyright_control , 'growx' 
	) ;
	Collection_tab.place( Copyright_panel , 'newline,growx' ) ;

	let Other_panel = new Grid() ;
	Other_panel.setTitle( @LRL-Other-panel ) ;
	Type_control = new uiText( 'Type' , bindings ) ;
	Subtype_control = new uiText( 'Subtype' , bindings ) ;
	Other_panel.place(
		@LRL-Type , 'split' ,
		Type_control , 'growx' ,
		@LRL-Subtype , 'newline,split' ,
		Subtype_control , 'growx'
	) ;
	Collection_tab.place( Other_panel , 'newline,growx' ) ;

	Collection_tab.addToEditor( editor , @LRL-Collection-tab ) ;

	bindings.bind() ; 
}

function createFrontPainter( diy , sheet ){

// STATS
	Progress_tinter = new createTinter( 'Progress' , diy ) ;

// TEXT
	Name_writer = new createTextBox( 'Name' , diy , sheet ) ;
	Body_writer = new createTextBox( 'Body' , diy , sheet ) ;
	Option_writer = new createTextBox( 'Option' , diy , sheet ) ;
	Type_writer = new createTextBox( 'Type' , diy , sheet ) ;
	Bottom_writer = new createTextBox( 'Bottom' , diy , sheet ) ;
	Subtype_writer = new createTextBox( 'Subtype' , diy , sheet ) ;
	EncounterSetNumber_writer = new createTextBox( 'EncounterSetNumber' , diy , sheet ) ;

	updateExternalPortrait( 'Portrait' , diy ) ;
	updateExternalPortrait( 'Collection' , diy ) ;
	updateExternalPortrait( 'EncounterSet' , diy ) ;
}

function createBackPainter( diy, sheet ){ 
	debug( 1 , 'createBackPainter' ) ;
}

function paintFront( g , diy , sheet ){ 

// PORTRAIT
	paintPortrait( 'Portrait' , g , diy , sheet ) ;

// TEMPLATE
	paintTemplate( g , sheet ) ;
	switch( $Difficulty ) {
	case 'Standard' : break ;
	case 'Custom' :
		paintDifficulty( $Difficulty , 'Location' , g , sheet ) ;
		break ;
	default :
		paintDifficulty( $Difficulty , 'Location' , g , sheet ) ;
		break ;
	}

// ICONS
	paintIcon( 'Collection' , g , diy , sheet ) ;
	paintIcon( 'EncounterSet' , g , diy , sheet ) ;
	paintIcon( 'OptionSpecial' , g , diy , sheet ) ;

// STATS
	paintStatTinted( 'Progress' , Progress_tinter , g , sheet ) ;
	paintStat( 'Threat' , g , sheet ) ;

// TEXTS
	writeName( g , diy ) ;
	writeBody( [ 'Trait' , 'Rules' , 'Shadow' , 'Flavour' ] , g , diy ) ;
//	switch( $Template ){
//	case 'Nightmare': region = diy.settings.getRegion( 'Nightmare-Body' ) ; break ;
//	default:
//		region = diy.settings.getRegion( 'Body' ) ;
//	}
	writeEncounterSetNumber( g , diy ) ;
	
	writeType( g , diy ) ;
	writeOptionLeft( g , sheet , diy ) ;
	writeOptionRight( g , sheet , diy ) ;
	
	writeArtist( g , sheet , diy ) ;
	writeCopyright( g , sheet , diy ) ;
	writeCollectionInfo( g , sheet , diy ) ;
	writeCollectionNumber( g , sheet , diy ) ;
	
	paintCut( g , diy , sheet ) ;
}

function paintBack( g, diy, sheet ){ 
	sheet.paintTemplateImage( g ) ;
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
