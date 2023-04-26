const Card = 'Contract' ; 
const CardVersion = 1 ;
// 1: new card using 2020 library
const TemplateList = new Array(
	'Neutral'
	, 'DoubleSided'
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
	diy.bleedMargin = 9 ;
	
	diy.customPortraitHandling = true ;
	createPortrait( 'Portrait' , diy ) ;
	createPortrait( 'PortraitBack' , diy ) ;
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
	uiName( diy , bindings , [FRONT,BACK] ) ;
	Title_panel.place(
		diy.nameField , 'growx'
	) ;
	Main_tab.place( Title_panel , 'newline,growx' ) ;
	
	let Effect_panel = new Grid() ;
	Effect_panel.setTitle( @LRL-Effect-panel ) ;
	Rules_control = new uiParagraph( 'Rules' , bindings ) ;
	Flavour_control = new uiParagraph( 'Flavour' , bindings ) ;
	Effect_panel.place(
		@LRL-Rules , 'center' , 
		Rules_control , 'newline,growx' ,
		@LRL-Flavour , 'newline,center' , 
		Flavour_control , 'newline,growx'
	) ;
	Main_tab.place( Effect_panel , 'newline,growx' ) ;
	
	let EffectAdvanced_panel = new Grid() ;
	EffectAdvanced_panel.setTitle( @LRL-EffectAdvanced-panel ) ;
	OptionLeft_control = new uiText( 'OptionLeft' , bindings ) ;
	OptionRight_control = new uiText( 'OptionRight' , bindings ) ;
	EffectAdvanced_panel.place(
		@LRL-OptionLeft , 'split' ,
		OptionLeft_control , 'growx',
		@LRL-OptionRight , 'newline,split' ,
		OptionRight_control , 'growx'
	) ;
	Main_tab.place( EffectAdvanced_panel , 'newline,growx' ) ;

	Main_tab.addToEditor( editor , @LRL-Main-tab ) ;

	// RULES BACK TAB
	var MainBack_tab = new Grid() ;
	MainBack_tab.editorTabScrolling = true ;
		
	let EffectBack_panel = new Grid() ;
	EffectBack_panel.setTitle( @LRL-Effect-panel ) ;
	RulesBack_control = new uiParagraph( 'RulesBack' , bindings , [BACK] ) ;
	FlavourBack_control = new uiParagraph( 'FlavourBack' , bindings , [BACK] ) ;
	EffectBack_panel.place(
		@LRL-Rules , 'center' , 
		RulesBack_control , 'newline,growx' ,
		@LRL-Flavour , 'newline,center' , 
		FlavourBack_control , 'newline,growx'
	) ;
	MainBack_tab.place( EffectBack_panel , 'newline,growx' ) ;
	
	let EffectAdvancedBack_panel = new Grid() ;
	EffectAdvancedBack_panel.setTitle( @LRL-EffectAdvanced-panel ) ;
	OptionLeftBack_control = new uiText( 'OptionLeftBack' , bindings , [BACK] ) ;
	OptionRightBack_control = new uiText( 'OptionRightBack' , bindings , [BACK] ) ;
	EffectAdvancedBack_panel.place(
		@LRL-OptionLeft , 'split' ,
		OptionLeftBack_control , 'growx',
		@LRL-OptionRight , 'newline,split' ,
		OptionRightBack_control , 'growx'
	) ;
	MainBack_tab.place( EffectAdvancedBack_panel , 'newline,growx' ) ;

	MainBack_tab.addToEditor( editor , @LRL-MainBack-tab ) ;
	
// TEMPLATE TAB
	var Template_tab = new Grid() ;
	Template_tab.editorTabScrolling = true ;
	
	let Template_panel = new Grid() ;
	Template_panel.setTitle( @LRL-Template-panel ) ;
	Template_control = new uiIconList( 'Template' , TemplateList , bindings , [FRONT,BACK] ) ;
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

	let PortraitBack_panel = new Grid() ;
	PortraitBack_panel.setTitle( @LRL-PortraitBack-panel ) ;
	PortraitBack_control = new uiPortrait( 'PortraitBack' , diy ) ;
	PortraitShare_control = new uiButtonText( 'PortraitShare' , diy , bindings ) ;
	PortraitBackMirror_control = new uiPortraitMirror( 'PortraitBack' , PortraitBack_control ) ;
	ArtistBack_control = new uiText( 'ArtistBack' , bindings ) ;
	PortraitBack_panel.place(
		PortraitShare_control , 'split' ,
		@LRL-Artist , '' ,
		ArtistBack_control , 'growx' ,
		PortraitBack_control , 'newline,growx' ,
		PortraitBackMirror_control , 'newline,growx'
	) ;
	Portrait_tab.place( PortraitBack_panel , 'newline,growx' ) ;
	
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
	SideA_control = new uiText( 'SideA' , bindings ) ;
	SideB_control = new uiText( 'SideB' , bindings ) ;
	Other_panel.place(
		@LRL-Type , 'split' ,
		Type_control , 'growx' ,
		@LRL-Side , 'newline,split' ,
		SideA_control , 'growx' ,
		@LRL-SideBack , 'newline,split' ,
		SideB_control , 'growx'
	) ;
	Collection_tab.place( Other_panel , 'newline,growx' ) ;
	
	Collection_tab.addToEditor( editor , @LRL-Collection-tab ) ;

	bindings.bind() ; 
}

function createFrontPainter( diy , sheet ){
	
// TEMPLATE

// STATS

// TEXT
	Name_writer = new createTextBox( 'Name' , diy , sheet ) ;
	Body_writer = new createTextBox( 'Body' , diy , sheet ) ;
	Option_writer = new createTextBox( 'Option' , diy , sheet ) ;
	Type_writer = new createTextBox( 'Type' , diy , sheet ) ;
	Bottom_writer = new createTextBox( 'Bottom' , diy , sheet ) ;
	Side_writer = new createTextBox( 'Side' , diy , sheet ) ;

	updateExternalPortrait( 'Portrait' , diy ) ;
	updateExternalPortrait( 'PortraitBack' , diy ) ;
	updateExternalPortrait( 'Collection' , diy ) ;
}

function createBackPainter( diy, sheet ){ 
	debug( 1 , 'createBackPainter' ) ;
}

function paintFront( g , diy , sheet ){ 
	
// PORTRAIT
	paintPortrait( 'Portrait' , g , diy , sheet ) ;

// TEMPLATE
	sheet.paintTemplateImage( g ) ;
	if( $Template == 'DoubleSided' ) sheet.paintImage( g , 'SideDecoration' , 'Template' ) ;
	
// ICONS
	paintIcon( 'Collection' , g , diy , sheet ) ;

// STATS

// TEXTS
	writeName( g , diy ) ;
	writeBody( [ 'Rules' , 'Flavour' ] , g , diy ) ;
	
	writeType( g , diy ) ;
	writeOptionLeft( g , sheet , diy ) ;
	writeOptionRight( g , sheet , diy ) ;
	if( $Template == 'DoubleSided' ) writeSideA( g , diy ) ;

	writeArtist( g , sheet , diy ) ;
	writeCopyright( g , sheet , diy ) ;
	writeCollectionInfo( g , sheet , diy ) ;
	writeCollectionNumber( g , sheet , diy ) ;
	
	paintCut( g , diy , sheet ) ;
}

function paintBack( g, diy, sheet ){ 
	
	if( $Template == 'DoubleSided' ){
		// PORTRAIT
		if(diy.settings.getBoolean( 'PortraitShare' , true ) === true ) paintPortrait( 'Portrait' , g , diy , sheet ) ;
		else paintPortrait( 'PortraitBack' , g , diy , sheet ) ;

		// TEMPLATE
		sheet.paintImage( g , 'Neutral-template' , 'Template' ) ;
		sheet.paintImage( g , 'SideDecoration' , 'Template' ) ;
	
		// ICONS
		paintIcon( 'Collection' , g , diy , sheet ) ;

		// TEXTS
		if( $NameBack == '' ){
			writeName( g , diy ) ;
		}else{
			writeBreakableLine(
				$NameBack , Name_writer ,
				diy.settings.getRegion( 'NameBack' ) , g
			) ;
		}

		writeBody( [ 'RulesBack' , 'FlavourBack' ] , g , diy ) ;

		writeType( g , diy ) ;
		if ( $OptionLeftBack != '' ){
			writeLineDecorated(
				$OptionLeftBack , Option_writer , diy.settings.getRegion( 'OptionLeft' ) ,
				ImageUtils.get( ImagePath+'VictoryDecoration.jp2' ) , diy.settings.getRegion( 'OptionLeftDecoration' ) ,
				g , sheet 
			) ;
		}
		if ( $OptionRightBack != '' ){
			writeLineDecorated(
				$OptionRightBack , Option_writer , diy.settings.getRegion( 'OptionRight' ) ,
				ImageUtils.get( ImagePath+'VictoryDecoration.jp2' ) , diy.settings.getRegion( 'OptionRightDecoration' ) ,
				g , sheet 
			) ;
		}
		writeSideB( g , diy ) ;
		
		writeArtistBack( g , sheet , diy ) ;
		writeCopyrightBack( g , sheet , diy ) ;
		writeCollectionInfo( g , sheet , diy ) ;
		writeCollectionNumberBack( g , sheet , diy ) ;
	}else{
		sheet.paintTemplateImage( g ) ;
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
