const Card = 'SideQuest' ; 
const CardVersion = 1 ;
// 1: rewrite using new 2020 library
const TemplateList = new Array(
	'Standard'
	, 'SmallTextArea'
	, 'Cave'
	, 'FullArt'
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
	debug( 1 , 'createInterface: create bindings' ) ;
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
	
	let Stats_panel = new Grid() ;
	Stats_panel.setTitle( @LRL-Stats-panel ) ;
	Progress_control = new uiStat( 'Progress' , bindings ) ;
	Stats_panel.place(
		uiIcon( 'Progress' ) , 'split' ,
		Progress_control , 'growx'
	) ;
	Main_tab.place( Stats_panel , 'newline,growx' ) ;
	
	let Effect_panel = new Grid() ;
	Effect_panel.setTitle( @LRL-Effect-panel ) ;
	Story_control = new uiParagraph( 'Story' , bindings ) ;
	Rules_control = new uiParagraph( 'Rules' , bindings ) ;
	Condition_control = new uiParagraph( 'Condition' , bindings ) ;
	Effect_panel.place(
		@LRL-Story , 'center' , 
		Story_control , 'newline,growx' ,
		@LRL-Rules , 'newline,center' , 
		Rules_control , 'newline,growx' ,
		@LRL-Condition , 'newline,center' , 
		Condition_control , 'newline,growx'
	) ;
	Main_tab.place( Effect_panel , 'newline,growx' ) ;
	
	let EffectAdvanced_panel = new Grid() ;
	EffectAdvanced_panel.setTitle( @LRL-EffectAdvanced-panel ) ;
	OptionRight_control = new uiText( 'OptionRight' , bindings ) ;
	EffectAdvanced_panel.place(
		@LRL-OptionRight , 'split' ,
		OptionRight_control , 'growx'
	) ;
	Main_tab.place( EffectAdvanced_panel , 'newline,growx' ) ;

	Main_tab.addToEditor( editor , @LRL-Main-tab ) ;
	
// ENCOUNTER SET TAB
	debug( 2 , '    EncounterSet_tab' ) ;
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
	PortraitShadow_control = new uiCycler( 
		'PortraitShadow' ,
		[ 'None' , 'Black' , 'Custom' ] ,
		bindings , [FRONT,BACK]
	);
	Artist_control = new uiText( 'Artist' , bindings ) ;
	Portrait_panel.place(
		@LRL-Artist , 'split' ,
		Artist_control , 'growx' ,
		Portrait_control , 'newline,growx' ,
		@LRL-PortraitShadow , 'newline,split' ,
		PortraitShadow_control , 'growx' ,
		PortraitMirror_control , ''
	) ;
	Portrait_tab.place( Portrait_panel , 'newline,growx' ) ;
		
	Portrait_tab.addToEditor( editor , @LRL-Portrait-tab ) ;
	
// COLLECTION TAB
	debug( 2 , '    Collection_tab' ) ;
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

	Collection_tab.addToEditor( editor , @LRL-Collection-tab ) ;

	bindings.bind() ; 
}

function createFrontPainter( diy , sheet ){
	debug( 1 , 'createFrontPainter' ) ;

	PortraitShadow_tinter = new createTinter( 'Portrait-shadow' , diy ) ;
	
// TEMPLATE
	Difficulty_tinter = new createTinter( 'Difficulty' , diy ) ;

// STATS
	Progress_tinter = new createTinter( 'Progress' , diy ) ;

// TEXT
	Name_writer = new createTextBox( 'Name' , diy , sheet ) ;
	Body_writer = new createTextBox( 'Body' , diy , sheet ) ;
	Option_writer = new createTextBox( 'Option' , diy , sheet ) ;
	Bottom_writer = new createTextBox( 'Bottom' , diy , sheet ) ;
	EncounterSetNumber_writer = new createTextBox( 'EncounterSetNumber' , diy , sheet ) ;
	
	updateExternalPortrait( 'Portrait' , diy ) ;
	updateExternalPortrait( 'Collection' , diy ) ;
	updateExternalPortrait( 'EncounterSet' , diy ) ;
}

function createBackPainter( diy, sheet ){ 
	debug( 1 , 'createBackPainter' ) ;
}

function paintFront( g , diy , sheet ){ 
	debug( 1 , 'paintFront' ) ;
	
// PORTRAIT
	paintPortrait( 'Portrait' , g , diy , sheet ) ;
	switch(String($PortraitShadow)){
	case 'None' : break ;
	case 'Black' :
		sheet.paintImage( g , 'Portrait-shadow' , 'Template' ) ;
		break ;
	case 'Custom' :
		hsb = diy.settings.getTint( 'Portrait-shadow' ) ;
		PortraitShadow_tinter.setFactors( hsb[0] , hsb[1] , hsb[2] ) ;
		sheet.paintImage( 
			g , PortraitShadow_tinter.getTintedImage() , 
			'Template' 
		) ;
		break ;
	}

// TEMPLATE
	// sombra opcional
	if( $Template != 'FullArt' ){
		paintTemplate( g , sheet ) ;
	}
	switch( $Difficulty ) {
	case 'Standard' : break ;
	case 'Custom' :
		hsb = diy.settings.getTint( 'Difficulty' ) ; //mover a listener
		Difficulty_tinter.setFactors( hsb[0] , hsb[1] , hsb[2] ) ;
		sheet.paintImage( 
			g , Difficulty_tinter.getTintedImage() , 
			'Difficulty' 
		) ;
		break ;
	default :
		hsb = diy.settings.getTint( $Difficulty ) ;
		Difficulty_tinter.setFactors( hsb[0] , hsb[1] , hsb[2] ) ;
		sheet.paintImage( 
			g , Difficulty_tinter.getTintedImage() , 
			'Difficulty' 
		) ;
		break ;
	}
	
// ICONS
	if( $Template != 'FullArt' ){
		paintIcon( 'Collection' , g , diy , sheet ) ;
		paintIcon( 'EncounterSet' , g , diy , sheet ) ;
	}

// STATS
	if( $Template != 'FullArt' ){
		paintStatTinted( 'Progress' , Progress_tinter , g , sheet ) ;
	}

// TEXTS
	if( $Template != 'FullArt' ){
		writeName( g , diy ) ;
		if ( $OptionRight != '' ){
			writeLineDecorated(
				$OptionRight , Option_writer , diy.settings.getRegion( 'OptionRight' ) ,
				ImageUtils.get( ImagePath+'VictoryDecoration.jp2' ) , diy.settings.getRegion( 'OptionRightDecoration' ) ,
				g , sheet 
			) ;
			Body_writer.setPageShape( diy.settings.getCupShape( 'Option-Body-shape' ) ) ;
		}else{
			Body_writer.setPageShape( PageShape.RECTANGLE_SHAPE ) ;
		}
		writeBody( [ 'Trait', 'Story' , 'Rules' , 'Condition' ] , g , diy ) ;
		writeEncounterSetNumber( g , diy ) ;
	}

	writeArtist( g , sheet , diy ) ;
	writeCopyright( g , sheet , diy ) ;

	if( $Template != 'FullArt' ){
		writeCollectionInfo( g , sheet , diy ) ;
		writeCollectionNumber( g , sheet , diy ) ;
	}

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
