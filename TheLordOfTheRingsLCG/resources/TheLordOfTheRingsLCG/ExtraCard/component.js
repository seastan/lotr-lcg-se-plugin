/* COMPONENT CONFIGURATION */
const Card = 'ExtraCard';
const CardVersion = 1 ;
// 1: rewrite using new 2020 library

const TemplateList = new Array(
	'Blue'
	, 'Green'
	, 'Purple'
	, 'Red'
	, 'Brown'
	, 'Yellow'
	, 'Custom'
) ;

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
	createPortrait( 'Background' , diy ) ;
	createPortrait( 'BackgroundBack' , diy ) ;
	createPortrait( 'Collection' , diy ) ;
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
	PageNumber_control = new uiSpinner( 'PageNumber' , bindings, 98 , [FRONT,BACK] ) ;
	PageTotal_control = new uiSpinner( 'PageTotal' , bindings, 98 , [FRONT,BACK] ) ;
	PageIn_control = new uiButtonText( 'PageIn' , diy , bindings , [FRONT,BACK] ) ;
	Title_panel.place(
		diy.nameField , 'growx' ,
		@LRL-Page, 'newline,split' ,
		PageNumber_control , '' ,
		@LRL-Total,'',
		PageTotal_control , '' ,
		PageIn_control , ''
	) ;
	Main_tab.place( Title_panel , 'newline,growx' ) ;

	let Effect_panel = new Grid() ;
	Effect_panel.setTitle( @LRL-Effect-panel ) ;
	Story_control = new uiParagraph( 'Story' , bindings, 'medium' ) ;
	Rules_control = new uiParagraph( 'Rules' , bindings, 'big' ) ;
	Flavour_control = new uiParagraph( 'Flavour' , bindings , 'medium' ) ;
	Effect_panel.place(
		@LRL-Story , 'center' , 
		Story_control , 'newline,growx' ,
		@LRL-Rules , 'newline,center' , 
		Rules_control , 'newline,growx' ,
		@LRL-Flavour , 'newline,center' , 
		Flavour_control  , 'newline,growx' 
	) ;
	Main_tab.place( Effect_panel , 'newline,growx' ) ;
	
	Main_tab.addToEditor( editor , @LRL-Main-tab ) ;
		
// RULES BACK TAB
	var MainBack_tab = new Grid() ;
	MainBack_tab.editorTabScrolling = true ;

	let EffectBack_panel = new Grid() ;
	EffectBack_panel.setTitle( @LRL-Effect-panel ) ;
	StoryBack_control = new uiParagraph( 'StoryBack' , bindings , 'medium' , [BACK] ) ;
	RulesBack_control = new uiParagraph( 'RulesBack' , bindings , 'big' , [BACK] ) ;
	FlavourBack_control = new uiParagraph( 'FlavourBack' , bindings , 'medium' , [BACK] ) ;
	EffectBack_panel.place(
		@LRL-Story, 'center' , 
		StoryBack_control , 'newline,growx' ,
		@LRL-Rules, 'newline,center' , 
		RulesBack_control , 'newline,growx' ,
		@LRL-Flavour , 'newline,center' , 
		FlavourBack_control  , 'newline,growx' 
	) ;
	MainBack_tab.place( EffectBack_panel , 'newline,growx' ) ;
	
	MainBack_tab.addToEditor( editor , @LRL-MainBack-tab ) ;
	
// ENCOUNTER SET TAB
// TEMPLATE TAB
	var Template_tab = new Grid() ;
	Template_tab.editorTabScrolling = true ;

	let Template_panel = new Grid() ;
	Template_panel.setTitle( @LRL-Template-panel ) ;
	var layout = new Array( 'None' , 'Title' ) ;
	Template_control = new uiIconList( 'Template' , TemplateList , bindings , [FRONT,BACK] ) ;
	TemplateLayout_control = new uiCycler( 'TemplateLayout' , layout , bindings ) ;
	Template_panel.place(
		Template_control , 'growx,split',
		@LRL-TemplateLayout , '' ,
		TemplateLayout_control , ''
	) ;
	Template_tab.place( Template_panel , 'newline,growx' ) ;

	TemplateColour_control = new uiTint( 'Custom' , bindings ) ;
	TemplateColour_control.title = @LRL-TemplateTextTint-uiTint ;
	Template_tab.place(
		TemplateColour_control , 'newline,growx'
	) ;
	
	let TemplateAdvanced_panel = new Grid() ;
	TemplateAdvanced_panel.setTitle( @LRL-TemplateAdvanced-panel ) ;
	ShowCut_control = new uiButtonText( 'ShowCut' , diy , bindings , [FRONT,BACK] ) ;
	ShowBleeding_control = new uiButtonText( 'ShowBleeding' , diy , bindings , [FRONT,BACK] ) ;
	Background_control = new uiPortrait( 'Background' , diy ) ;
	BackgroundBack_control = new uiPortrait( 'BackgroundBack' , diy ) ;
	TemplateAdvanced_panel.place(
		@LRL-CutPreview , 'split' ,
		ShowCut_control , '',
		ShowBleeding_control ,'' ,
		Background_control , 'newline,growx' ,
		BackgroundBack_control , 'newline,grow'
	) ;
	Template_tab.place( TemplateAdvanced_panel , 'newline,growx' ) ;
	
	Template_tab.addToEditor( editor , @LRL-Template-tab ) ;
	
// PORTRAIT TAB
	
// COLLECTION TAB
	var Collection_tab = new Grid() ; 
	Collection_tab.editorTabScrolling = true ;
	
	let Collection_panel = new Grid() ;
	Collection_panel.setTitle( @LRL-Collection-panel ) ;
//	CollectionNumber_control = new uiSpinner( 'CollectionNumber' , bindings , [FRONT,BACK] ) ;
	CollectionInfo_control = new uiText( 'CollectionInfo' , bindings , [FRONT,BACK] ) ;
	Collection_control = new uiIconList( 'Collection' , GO.DefaultIconList.concat( GO.CollectionList ) , bindings , [FRONT,BACK] ) ;
	CollectionPortrait_control = new uiPortrait( 'Collection' , diy ) ;
	Collection_panel.place(
		Collection_control , 'growx' ,
		@LRL-Information , 'newline,split' ,
		CollectionInfo_control , 'growx' ,
		CollectionPortrait_control , 'newline,growx'
	) ;
	Collection_tab.place( Collection_panel , 'newline,growx' ) ;
	
	let Copyright_panel = new Grid() ;
	Copyright_panel.setTitle( @LRL-Copyright-panel ) ;
	Copyright_control = new uiText( 'Copyright' , bindings , [FRONT,BACK] ) ;
	Copyright_panel.place(
		Copyright_control , 'growx' 
	) ;
	Collection_tab.place( Copyright_panel , 'newline,growx' ) ;

	Collection_tab.addToEditor( editor , @LRL-Collection-tab ) ;

	bindings.bind() ; 
}

function createFrontPainter( diy, sheet ){
// TEMPLATE
	ClassicCustom_tinter = new createTinterVariable( $Classic-Custom , diy ) ;

// PORTRAIT

// STATS

// TEXT
	Name_writer = new createTextBox( 'Name' , diy , sheet ) ;
	Name_writer.setLineTightness( 10 ) ;
	Body_writer = new createTextBox( 'Body' , diy , sheet ) ;
	Page_writer = new createTextBox( 'Page' , diy , sheet ) ;
	Bottom_writer = new createTextBox( 'Bottom' , diy , sheet ) ;
	
	updateExternalPortrait( 'Collection' , diy ) ;
	updateExternalPortrait( 'Background' , diy ) ;
}

function createBackPainter( diy, sheet ){
// STATS

// TEXT

	updateExternalPortrait( 'BackgroundBack' , diy ) ;
}

function paintFront( g, diy, sheet ){

// TEMPLATE
	switch( $Template ){
	case 'Custom' :
		tint = diy.settings.getTint( 'Custom' ) ;
		ClassicCustom_tinter.setFactors( tint[0] , tint[1] , tint[2] ) ; // mover a listener
		sheet.paintImage( g , ClassicCustom_tinter.getTintedImage() , 'Template' ) ;
		break ;
	default :
		sheet.paintImage( g , 'Standard-'+$Template , 'Template' ) ; 
	}
	sheet.paintTemplateImage( g ) ;
	paintPortrait( 'Background' , g , diy , sheet ) ;

// ICONS
	paintIcon( 'Collection' , g , diy , sheet ) ;

// TEXTS
	if( $TemplateLayout != 'None' ){
		writeTextOutlined( 
			$Name , Name_writer , 
			diy.settings.getRegion( 'Name' ) , selectStroke( 'Bottom-stroke' , diy ) ,
			g , sheet , diy
		) ;
	}
	
	region = settingToArray( 'Body-region' , 'number' ) ;
	switch( $TemplateLayout ){
	case 'Title':
		region[1] = Number( region[1] )+30 ;
		region[3] = Number( region[3] )-30 ;
	default: 
		break;
	}
	writeParagraph(
		[ 'Story' , 'Rules' , 'Flavour' ] , Body_writer ,
		new Region( region )  , g , diy 
	) ;	

	writeTextOutlined( 
		'<left>'+$CollectionInfo , Bottom_writer , 
		diy.settings.getRegion( 'CollectionInfo' ) , selectStroke( 'Bottom-stroke' , diy ) , 
		g , sheet , diy 
	) ;
//	writeCopyright( g , sheet , diy ) ;
	if ( Number( $PageNumber ) != 0 ){
		var page = #LRL-Page ;
		if( ($LRL-Page != '') && ($LRL-Page != 'null') ) page = $LRL-Page ;
		page = page+' '+Number( $PageNumber ) ;
		if ( $PageTotal != 0 ) page = page+$LRL-PageOf+$PageTotal ;
		if( diy.settings.getBoolean( 'PageIn' ) ){ 
			if( diy.settings.getBoolean( 'PageFrontShow' , true ) ) writeLine( $PageIn-format+page+$PageIn-formatEnd , Body_writer , diy.settings.getRegion( 'PageIn' ) , g ) ;
		}else{
			writeLineDecorated(
				page , Page_writer , diy.settings.getRegion( 'Page' ) ,
				ImageUtils.get( ImagePath+'VictoryDecoration.jp2' ) , diy.settings.getRegion( 'PageDecoration' ) ,
				g , sheet 
			) ;
		}
	}
	
	paintCut( g , diy , sheet ) ;
}

function paintBack( g, diy, sheet ){
// TEMPLATE
	switch( $Template ){
	case 'Custom' :
		tint = diy.settings.getTint( 'Custom' ) ;
		ClassicCustom_tinter.setFactors( tint[0] , tint[1] , tint[2] ) ; // mover a listener
		sheet.paintImage( g , ClassicCustom_tinter.getTintedImage() , 'Template' ) ;
		break ;
	default :
		sheet.paintImage( g , 'Standard-'+$Template , 'Template' ) ; 
	}
	sheet.paintTemplateImage( g ) ;
	paintPortrait( 'BackgroundBack' , g , diy , sheet ) ;
// ICONS
	paintIcon( 'Collection' , g , diy , sheet ) ;
// TEXT
	writeParagraph(  
		[ 'StoryBack' , 'RulesBack' , 'FlavourBack' ] , Body_writer ,
		diy.settings.getRegion( 'Body' ) , g , diy 
	) ;

	writeTextOutlined( 
		'<left>'+$CollectionInfo , Bottom_writer , 
		diy.settings.getRegion( 'CollectionInfo' ) , selectStroke( 'Bottom-stroke' , diy ) , 
		g , sheet , diy 
	) ;
//	writeCopyright( g , sheet , diy ) ;

	var pageNumber = $PageNumber ;
	if( $PageNumberBack ){
		pageNumber = $PageNumberBack ;
	}
	var pageTotal = $PageTotal ;
	if( $PageTotalBack ){
		pageTotal = $PageTotalBack ;
	}

	if ( Number( pageNumber ) != 0 ){
		var page = #LRL-Page ;
		if( ($LRL-Page != '') && ($LRL-Page != 'null') ) page = $LRL-Page ;
		page = page+' '+Number( pageNumber ) ;
		if ( pageTotal != 0 ) page = page+$LRL-PageOf+pageTotal ;
		if( diy.settings.getBoolean( 'PageIn' ) ){ 
			if( diy.settings.getBoolean( 'PageBackShow' ,true ) ) writeLine( $PageIn-format+page+$PageIn-formatEnd , Body_writer , diy.settings.getRegion( 'PageIn' ) , g ) ;
		}else{
			writeLineDecorated(
				page , Page_writer , diy.settings.getRegion( 'Page' ) ,
				ImageUtils.get( ImagePath+'VictoryDecoration.jp2' ) , diy.settings.getRegion( 'PageDecoration' ) ,
				g , sheet 
			) ;
		}
	}

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
