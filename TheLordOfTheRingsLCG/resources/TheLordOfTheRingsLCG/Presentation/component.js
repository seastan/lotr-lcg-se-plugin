const Card = 'Presentation';
const CardVersion = 1 ;
// 1: rewrite using new 2020 library
const TemplateList = new Array( 
	'Standard' 
	, 'Nightmare' 
	, 'Custom' 
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
	createPortrait( 'GameName' , diy ) ;
	createPortrait( 'Name' , diy ) ;
	createPortrait( 'BackgroundBack' , diy ) ;
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

	let Effect_panel = new Grid() ;
	Effect_panel.setTitle( @LRL-Effect-panel ) ;
	Story_control = new uiParagraph( 'Story' , bindings, 'medium' , [BACK] ) ;
	Description_control = new uiParagraph( 'Description' , bindings , 'big' , [BACK] ) ;
	Flavour_control = new uiParagraph( 'Flavour' , bindings , 'medium' , [BACK] ) ;
	Effect_panel.place(
		@LRL-Story , 'center' , 
		Story_control , 'newline,growx' ,
		@LRL-Description , 'newline,center' , 
		Description_control , 'newline,growx' ,
		@LRL-Flavour , 'newline,center' , 
		Flavour_control  , 'newline,growx' 
	) ;
	Main_tab.place( Effect_panel , 'newline,growx' ) ;
	
	Main_tab.addToEditor( editor , @LRL-Main-tab ) ;
	
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
	
	let TemplateColour_panel = new Grid() ;
	TemplateColour_panel.setTitle( @LRL-TemplateColour-panel ) ;
	TemplateTint_control = new uiTint( 'Custom' , bindings ) ;
	TemplateTint_control.title = @LRL-TemplateTint-uiTint ;
	TemplateInTint_control = new uiTint( 'Custom-in' , bindings ) ;
	TemplateInTint_control.title = @LRL-TemplateTextTint-uiTint ;
	TemplateColour_panel.place(
		TemplateTint_control , 'growx',
		TemplateInTint_control , 'newline,growx'	) ;
	Template_tab.place( TemplateColour_panel , 'newline,growx' ) ;
	
	let TemplateAdvanced_panel = new Grid() ;
	TemplateAdvanced_panel.setTitle( @LRL-TemplateAdvanced-panel ) ;
	ShowCut_control = new uiButtonText( 'ShowCut' , diy , bindings , [FRONT,BACK] ) ;
	ShowBleeding_control = new uiButtonText( 'ShowBleeding' , diy , bindings , [FRONT,BACK] ) ;
	BackgroundBack_control = new uiPortrait( 'BackgroundBack' , diy ) ;
	TemplateAdvanced_panel.place(
		@LRL-CutPreview , 'split' ,
		ShowCut_control , '',
		ShowBleeding_control ,'' ,
		BackgroundBack_control , 'newline,grow'

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

	let Other_panel = new Grid() ;
	Other_panel.setTitle( @LRL-Other-panel ) ;
	GameName_control = new uiText( 'GameName' , bindings ) ;
	GameNamePortrait_control = new uiPortrait( 'GameName' , diy ) ;
	NamePortrait_control = new uiPortrait( 'Name' , diy ) ;
	Type_control = new uiText( 'Type' , bindings ) ;
	Other_panel.place(
		@LRL-GameName , 'split' ,
		GameName_control , 'growx' ,
		GameNamePortrait_control , 'newline,growx' ,
		NamePortrait_control , 'newline,growx' ,
		@LRL-Type , 'newline,split' ,
		Type_control , 'growx'
	) ;
	Collection_tab.place( Other_panel , 'newline,growx' ) ;

	Collection_tab.addToEditor( editor , @LRL-Collection-tab ) ;

	bindings.bind() ; 
}

function createFrontPainter( diy, sheet ){
// TEMPLATE
	CustomIn_tinter = new createTinter( 'Custom-in' , diy ) ;
	Custom_tinter = new createTinter( 'Custom' , diy ) ;
	
// TEXT
	Name_writer = new createTextBox( 'Name' , diy , sheet ) ;
	//Name_writer.setLineTightness( 10 ) ;
	
	updateExternalPortrait( 'Portrait' , diy ) ;
	updateExternalPortrait( 'GameName' , diy ) ;
	updateExternalPortrait( 'Name' , diy ) ;
	
}

function createBackPainter( diy, sheet ){
	Body_writer = new createTextBox( 'Body' , diy , sheet ) ;
	Bottom_writer = new createTextBox( 'Bottom' , diy , sheet ) ;
	Type_writer = new createTextBox( 'Type' , diy , sheet ) ;
	Page_writer = new createTextBox( 'Page' , diy , sheet ) ;
	updateExternalPortrait( 'Collection' , diy ) ;
	updateExternalPortrait( 'BackgroundBack' , diy ) ;
}

function paintFront( g, diy, sheet ){
// PORTRAIT
	paintPortrait( 'Portrait' , g , diy , sheet ) ;

// TEMPLATE
	switch( $Template ){
	case 'Custom' :
		CustomIn_tinter.setImage( ImageUtils.get( CardPath+'Custom-in.jp2' ) ) ;
		let tint = diy.settings.getTint( 'Custom-in' ) ;
		CustomIn_tinter.setFactors( tint[0] , tint[1] , tint[2] ) ; // mover a listener
		sheet.paintImage( 
			g , 
			CustomIn_tinter.getTintedImage() , 
			'Template' 
		) ;
		Custom_tinter.setImage( ImageUtils.get( CardPath+'Custom-out.jp2' ) ) ;
		tint = diy.settings.getTint( 'Custom' ) ;
		Custom_tinter.setFactors( tint[0] , tint[1] , tint[2] ) ; // mover a listener
		sheet.paintImage( 
			g , 
			Custom_tinter.getTintedImage() , 
			'Template' 
		) ;
		sheet.paintImage( 
			g , ImageUtils.get( CardPath+'Custom.jp2' ) , 
			'Template'
		) ; 
		break ;
	default :
		paintTemplate( g , sheet ) ;
	}

// TEXTS
	paintPortrait( 'Name' , g , diy , sheet ) ;
	writeTextOutlined( 
		$Name , Name_writer , 
		diy.settings.getRegion( 'Name' ) , selectStroke( 'Name-stroke' , diy ) ,
		g , sheet , diy
	) ;
	
	paintPortrait( 'GameName' , g , diy , sheet ) ;
	writeTextOutlined( 
		$GameName , Name_writer , 
		diy.settings.getRegion( 'GameName' ) , selectStroke( 'GameName-stroke' , diy ) ,
		g , sheet , diy
	) ;

	paintCut( g , diy , sheet ) ;
}

function paintBack( g, diy, sheet ){
	switch( $Template ){
	case 'Custom' :
		Custom_tinter.setImage( ImageUtils.get( CardPath+'CustomBack-out.jp2' ) ) ;
		if( diy.settings.getBoolean( 'CustomBack' ) ) tint = diy.settings.getTint( 'CustomBack' ) ;
		else tint = diy.settings.getTint( 'Custom' ) ;
		Custom_tinter.setFactors( tint[0] , tint[1] , tint[2] ) ; // mover a listener
		sheet.paintImage( 
			g , 
			Custom_tinter.getTintedImage() , 
			'Template'
		) ;
		sheet.paintImage( 
			g , ImageUtils.get( CardPath+'CustomBack.jp2' ) , 
			'Template'
		) ; 
		break ;
	default :
		sheet.paintImage( 
			g , ImageUtils.get( CardPath+$Template+'Back.jp2' ) , 
			'Template'
		) ; 
	}
	paintPortrait( 'BackgroundBack' , g , diy , sheet ) ;

// ICONS
	paintIcon( 'Collection' , g , diy , sheet ) ;

// TEXTS
	artistRegion = diy.settings.getRegion( 'Artist' ) ;
	collectionInfoRegion = diy.settings.getRegion( 'CollectionInfo' ) ;
	
	switch( diy.settings.get( 'Artist' , '' ) ){
	case 'no' : text = '' ; break ;
	case '' : 
		if( diy.settings.get( 'LRL-IllustratorUnknown' , '' ) != '' ) text = $LRL-IllustratorUnknown ; 
		else text = #LRL-IllustratorUnknown ; 
		break ;
	default : 
		if( diy.settings.get( 'LRL-IllustratorShort' , '' ) != '' ) text = $LRL-IllustratorShort+' '+$Artist ;
		else text = #LRL-IllustratorShort+' '+$Artist ;
	}
	writeTextOutlined( 
		'<left>'+text , Bottom_writer , 
		artistRegion , selectStroke( 'Bottom-stroke' , diy ) , 
		g , sheet , diy 
	) ;
	writeCopyright( g , sheet , diy ) ;
	writeTextOutlined( 
		'<right>'+$CollectionInfo , Bottom_writer , 
		collectionInfoRegion , selectStroke( 'Bottom-stroke' , diy ) , 
		g , sheet , diy 
	) ;
	switch( $Template ){
	case 'Nightmare' :
		bodyRegion = diy.settings.getRegion( 'Nightmare-Body' ) ;
		break ;
	default :
		bodyRegion = diy.settings.getRegion( 'Body' ) ;
	}
	writeParagraph( 
		[ 'Story' , 'Description' , 'Flavour' ] , Body_writer , 
		 bodyRegion , g , diy 
	) ;
	
	switch( $Template ){
	case 'Nightmare' :
		if(  diy.settings.get( 'Type' , '' ) == '' ) text = #LRL-Presentation ;
		else text = $Type ;
		writeLine( 
			text , Type_writer , 
			diy.settings.getRegion( 'Nightmare-Type-region' ) , g 
		) ;
		break ;
	default :
		writeType( g , diy ) ;
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
