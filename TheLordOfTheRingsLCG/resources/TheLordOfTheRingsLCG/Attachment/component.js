const Card = 'Attachment' ; 
const CardVersion = 1 ;
// 1: rewrite using new 2020 library

const TemplateList = new Array(
	'Neutral'
	, 'Leadership'
	, 'Lore'
	, 'Spirit'
	, 'Tactics'
	, 'Baggins'
	, 'Fellowship'
	, 'Mastery'
	, 'CustomSphere'
	, 'Boon'
	, 'BoonLeadership'
	, 'BoonLore'
	, 'BoonSpirit'
	, 'BoonTactics'
	, 'PlayerObjective'
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
	createPortrait( 'Collection' , diy ) ;
	createPortrait( 'CustomSphere' , diy ) ;
	createPortrait( 'BodyIcon' , diy ) ;
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
	ResourceCost_control = new uiStat( 'ResourceCost' , bindings ) ;
	Stats_panel.place(
		uiIcon( 'ResourceCost' ) , 'split' ,
		ResourceCost_control , 'growx'
	) ;
	Main_tab.place( Stats_panel , 'newline,growx' ) ;
	
	let Effect_panel = new Grid() ;
	Effect_panel.setTitle( @LRL-Effect-panel ) ;
	Trait_control = new uiText( 'Trait' , bindings ) ;
	Rules_control = new uiParagraph( 'Rules' , bindings ) ;
	Flavour_control = new uiParagraph( 'Flavour' , bindings ) ;
	Effect_panel.place(
		@LRL-Trait , 'center' , 
		Trait_control , 'newline,growx' ,
		@LRL-Rules , 'newline,center' , 
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
	
	let CustomSphere_panel = new Grid() ;
	CustomSphere_panel.setTitle( @LRL-CustomSphere-panel ) ;
	CustomSpherePortrait_control = new uiPortrait( 'CustomSphere' , diy ) ;
	CustomSphereBodyIconPortrait_control = new uiPortrait( 'BodyIcon' , diy ) ;
	CustomSphereBodyIconTransparency_control = new uiTransparency( 'BodyIcon' , bindings ) ;
	CustomSphereTint_control = new uiTint( 'CustomSphere' , bindings ) ;
	CustomSphereTint_control.title = @LRL-CustomSphere-uiTint ;
	CustomSphere_panel.place(
		CustomSphereTint_control , 'growx',
		CustomSpherePortrait_control ,'newline,growx' ,
		CustomSphereBodyIconPortrait_control , 'newline,growx' ,
		@LRL-uiTransparency , 'newline,split' ,
		CustomSphereBodyIconTransparency_control , 'growx'
	) ;
	Template_tab.place( CustomSphere_panel , 'newline,growx' ) ;
	
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
	
// TEMPLATE
	CustomSphere_tinter = new createTinter( 'CustomSphere' , diy ) ;

// STATS
	ResourceCost_tinter = new createTinter( 'ResourceCost' , diy ) ;

// TEXT
	Name_writer = new createTextBox( 'Name' , diy , sheet ) ;
	Body_writer = new createTextBox( 'Body' , diy , sheet ) ;
	Option_writer = new createTextBox( 'Option' , diy , sheet ) ;
	Type_writer = new createTextBox( 'Type' , diy , sheet ) ;
	Bottom_writer = new createTextBox( 'Bottom' , diy , sheet ) ;
	Subtype_writer = new createTextBox( 'Subtype' , diy , sheet ) ;
	Side_writer = new createTextBox( 'Side' , diy , sheet ) ;

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

// TEMPLATE
	if( $Template == 'CustomSphere' ){
		let tint = diy.settings.getTint( 'CustomSphere' )
		CustomSphere_tinter.setFactors( tint[0] , tint[1] , tint[2] ) ; // mover a listener
		
	//	CustomSphere_tinter.paintImage( 'Template-region' ) ; //a\u00f1adir metodo
		CustomSphere_tinter.setImage( diy.settings.getImageResource( 'CustomSphere-Body-tintable' ) ) ;
		sheet.paintImage( g , CustomSphere_tinter.getTintedImage() , 'Template' ) ;
		
		CustomSphere_tinter.setImage( PortraitList[ portraitIndexOf( 'BodyIcon' ) ].getImage() ) ;
		sheet.paintImage( g , 
			ImageUtilities.alphaComposite( CustomSphere_tinter.getTintedImage() , Number($BodyIcon-transparency)/10 ) , 
			'BodyIcon-portrait-clip' 
		) ;
		
		sheet.paintTemplateImage( g ) ;
		
		CustomSphere_tinter.setImage( diy.settings.getImageResource( 'CustomSphere-Sphere-tintable' ) ) ;
		sheet.paintImage( g , CustomSphere_tinter.getTintedImage() , 'Template' ) ;
	}else{ 
		paintTemplate( g , sheet ) ; // this will draw the selected $Template
	}
	
// ICONS
	paintIcon( 'Collection' , g , diy , sheet ) ;
	if( $Template == 'CustomSphere' ) paintIcon( 'CustomSphere' , g , diy , sheet ) ;

// STATS
	if( $Template != 'PlayerObjective' ) paintStatTinted( 'ResourceCost' , ResourceCost_tinter , g , sheet ) ;

// TEXTS
	writeName( g , diy ) ;
	writeBody( [ 'Trait' , 'Rules' , 'Shadow' , 'Flavour' ] , g , diy ) ;
//	switch( $Template ){
//	case 'Neutral':
//	case 'Boon':
//		Body_writer.setPageShape( PageShape.RECTANGLE_SHAPE ) ;
//		break;
//	default:
//		Body_writer.setPageShape( diy.settings.getCupShape( 'Sphere-Body-shape' ) ) ;
//	}
	
	writeType( g , diy ) ;
	if( ($Template == 'Boon') || ($Template == 'BoonLeadership') || ($Template == 'BoonLore') || ($Template == 'BoonSpirit') || ($Template == 'BoonTactics') ) writeSubtype( g , diy ) ;
	writeOptionLeft( g , sheet , diy ) ;
	writeOptionRight( g , sheet , diy ) ;
	if( $Template == 'PlayerObjective' ) writeSide( g , diy ) ;

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
