const Card = 'Haven';
const CardVersion = 1 ;
// 1: rewrite using new 2020 library
const TemplateList = new Array( 'Neutral' ) ;

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
	
	let Effect_panel = new Grid() ;
	Effect_panel.setTitle( @LRL-Effect-panel ) ;
	Trait_control = new uiText( 'Trait' , bindings ) ;
	TraitIn_control = new uiButtonText( 'TraitOut' , diy , bindings , [FRONT] ) ;
	Rules_control = new uiParagraph( 'Rules' , bindings ) ;
	Condition_control = new uiParagraph( 'Condition' , bindings ) ;
	Effect_panel.place(
		@LRL-Trait , 'center' , 
		Trait_control , 'newline,growx,split' ,
		TraitIn_control , '' ,
		@LRL-Rules , 'newline,center' , 
		Rules_control , 'newline,growx' ,
		@LRL-Condition , 'newline,center' , 
		Condition_control , 'newline,growx'
	) ;
	Main_tab.place( Effect_panel , 'newline,growx' ) ;
	
	Main_tab.addToEditor( editor , @LRL-Main-tab ) ;
	
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
		PortraitMirror_control , 'newline,split' ,
		@LRL-PortraitShadow , '' ,
		PortraitShadow_control , 'growx'
	) ;
	Portrait_tab.place( Portrait_panel , 'newline,growx' ) ;
	
	Portrait_tab.addToEditor( editor , @LRL-Portrait-tab ) ;

// TEMPLATE TAB
	var Template_tab = new Grid() ;
	Template_tab.editorTabScrolling = true ;
	
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
	Other_panel.place(
		@LRL-Type , 'split' ,
		Type_control , 'growx'
	) ;
	Collection_tab.place( Other_panel , 'newline,growx' ) ;

	Collection_tab.addToEditor( editor , @LRL-Collection-tab ) ;

	bindings.bind() ;
}

function createFrontPainter( diy, sheet ){
	PortraitShadow_tinter = new createTinter( 'Portrait-shadow' , diy ) ;
// TEMPLATE

// TEXT
	Name_writer = new createTextBox( 'Name' , diy , sheet ) ;
	Body_writer = new createTextBox( 'Body' , diy , sheet ) ;
	Option_writer = new createTextBox( 'Option' , diy , sheet ) ;
	Type_writer = new createTextBox( 'Type' , diy , sheet ) ;
	Bottom_writer = new createTextBox( 'Bottom' , diy , sheet ) ;

	updateExternalPortrait( 'Portrait' , diy ) ;
	updateExternalPortrait( 'Collection' , diy ) ;
	updateExternalPortrait( 'CustomSphere' , diy ) ;
	updateExternalPortrait( 'BodyIcon' , diy ) ;
}

function createBackPainter( diy, sheet ){ 
	debug( 1 , 'createBackPainter' ) ;
}

function paintFront( g , diy , sheet ){ 
	
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
	sheet.paintTemplateImage( g ) ;

// ICONS
	paintIcon( 'Collection' , g , diy , sheet ) ;

// TEXTS
	writeName( g , diy ) ;
	if( diy.settings.getBoolean('TraitOut') ) {
		sheet.paintImage( g , ImageUtils.get(CardPath+'TraitOut.jp2') , 'Template' ) ;
		writeLine( $TraitOut-format+$Trait , Option_writer , diy.settings.getRegion('TraitOut') , g ) ;
		writeBody( [ 'Rules' , 'Condition' ] , g , diy ) ;
	}else{
		writeBody( [ 'Trait' , 'Rules' , 'Condition' ] , g , diy ) ;
	}

	writeType( g , diy ) ;

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
