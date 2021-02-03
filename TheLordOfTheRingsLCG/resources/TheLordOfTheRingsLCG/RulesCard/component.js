/* COMPONENT CONFIGURATION */
const Card = 'RulesCard';
const CardVersion = 1 ;
// 1: rewrite using new 2020 library

const TemplateList = new Array(
	'Standard'
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
	createPortrait( 'PortraitBack' , diy ) ;
	createPortrait( 'Collection' , diy ) ;
	createPortrait( 'EncounterSet' , diy ) ;
	createPortrait( 'EncounterSet1' , diy ) ;
	createPortrait( 'EncounterSet2' , diy ) ;
	createPortrait( 'EncounterSet3' , diy ) ;
	createPortrait( 'EncounterSet4' , diy ) ;
	createPortrait( 'EncounterSet5' , diy ) ;
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
	Title_panel.place(
		diy.nameField , 'growx' ,
		@LRL-Page, 'newline,split' ,
		PageNumber_control , '' ,
		@LRL-Total,'',
		PageTotal_control , ''
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
	var EncounterSet_tab = new Grid() ; 
	EncounterSet_tab.editorTabScrolling = true ;
	
	let EncounterSet_panel = new Grid() ;
	EncounterSet_panel.setTitle( @LRL-EncounterSet-panel ) ;
	
	var iconList = GO.DefaultIconList.concat( GO.EncounterSetList ) ;
	EncounterSet_control = new uiIconList( 'EncounterSet' , iconList , bindings ) ;
	EncounterSetPortrait_control = new uiPortrait( 'EncounterSet' , diy ) ;
	EncounterSet_panel.place(
		EncounterSet_control , 'growx' ,
		EncounterSetPortrait_control , 'newline,growx'
	) ;
	EncounterSet_tab.place( EncounterSet_panel , 'newline,growx' ) ;
	
	let EncounterSet1_panel = new Grid() ;
	EncounterSet1_panel.setTitle( @LRL-EncounterSet1-panel ) ;
	EncounterSet1_control = new uiIconList( 'EncounterSet1' , iconList , bindings ) ;
	EncounterSet1Portrait_control = new uiPortrait( 'EncounterSet1' , diy ) ;
	EncounterSet1_panel.place(
		EncounterSet1_control , 'growx' ,
		EncounterSet1Portrait_control , 'newline,growx'
	) ;
	EncounterSet_tab.place( EncounterSet1_panel , 'newline,growx' ) ;

	let EncounterSet2_panel = new Grid() ;
	EncounterSet2_panel.setTitle( @LRL-EncounterSet2-panel ) ;
	EncounterSet2_control = new uiIconList( 'EncounterSet2' , iconList , bindings ) ;
	EncounterSet2Portrait_control = new uiPortrait( 'EncounterSet2' , diy ) ;
	EncounterSet2_panel.place(
		EncounterSet2_control , 'growx' ,
		EncounterSet2Portrait_control , 'newline,growx'
	) ;
	EncounterSet_tab.place( EncounterSet2_panel , 'newline,growx' ) ;
	
	let EncounterSet3_panel = new Grid() ;
	EncounterSet3_panel.setTitle( @LRL-EncounterSet3-panel ) ;
	EncounterSet3_control = new uiIconList( 'EncounterSet3' , iconList , bindings ) ;
	EncounterSet3Portrait_control = new uiPortrait( 'EncounterSet3' , diy ) ;
	EncounterSet3_panel.place(
		EncounterSet3_control , 'growx' ,
		EncounterSet3Portrait_control , 'newline,growx'
	) ;
	EncounterSet_tab.place( EncounterSet3_panel , 'newline,growx' ) ;
	
	let EncounterSet4_panel = new Grid() ;
	EncounterSet4_panel.setTitle( @LRL-EncounterSet4-panel ) ;
	EncounterSet4_control = new uiIconList( 'EncounterSet4' , iconList , bindings ) ;
	EncounterSet4Portrait_control = new uiPortrait( 'EncounterSet4' , diy ) ;
	EncounterSet4_panel.place(
		EncounterSet4_control , 'growx' ,
		EncounterSet4Portrait_control , 'newline,growx'
	) ;
	EncounterSet_tab.place( EncounterSet4_panel , 'newline,growx' ) ;
	
	let EncounterSet5_panel = new Grid() ;
	EncounterSet5_panel.setTitle( @LRL-EncounterSet5-panel ) ;
	EncounterSet5_control = new uiIconList( 'EncounterSet5' , iconList , bindings ) ;
	EncounterSet5Portrait_control = new uiPortrait( 'EncounterSet5' , diy ) ;
	EncounterSet5_panel.place(
		EncounterSet5_control , 'growx' ,
		EncounterSet5Portrait_control , 'newline,growx'
	) ;
	EncounterSet_tab.place( EncounterSet5_panel , 'newline,growx' ) ;
	
	EncounterSet_tab.addToEditor( editor , @LRL-EncounterSet-tab ) ;

// TEMPLATE TAB
	var Template_tab = new Grid() ;
	Template_tab.editorTabScrolling = true ;

	let Template_panel = new Grid() ;
	Template_panel.setTitle( @LRL-Template-panel ) ;
	var layout = new Array( 'None' , 'EncounterSet' , 'Title' ) ;
//	Template_control = new uiIconList( 'Template' , TemplateList , bindings , [FRONT,BACK] ) ;
	TemplateLayout_control = new uiCycler( 'TemplateLayout' , layout , bindings ) ;
	Template_panel.place(
//		Template_control , 'growx,split',
		@LRL-TemplateLayout , '' ,
		TemplateLayout_control , ''
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
	
	let PortraitBack_panel = new Grid() ;
	PortraitBack_panel.setTitle( @LRL-PortraitBack-panel ) ;
	PortraitBack_control = new uiPortrait( 'PortraitBack' , diy ) ;
	var sizes = new Array( 'None' , 'Small' , 'Medium' ) ;
	PortraitBackSize_control = new uiCycler( 'PortraitBackSize' , sizes , bindings , [BACK] ) ;
	PortraitBackMirror_control = new uiPortraitMirror( 'PortraitBack' , PortraitBack_control ) ;
	ArtistBack_control = new uiText( 'ArtistBack' , bindings , [BACK] ) ;
	PortraitBack_panel.place(
		@LRL-Artist , 'split' ,
		ArtistBack_control , 'growx' ,
		PortraitBack_control , 'newline,growx' ,
		@LRL-Size , 'newline,split' ,
		PortraitBackSize_control , 'growx' ,
		PortraitBackMirror_control , ''
	) ;
	Portrait_tab.place( PortraitBack_panel , 'newline,growx' ) ;

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

	Collection_tab.addToEditor( editor , @LRL-Collection-tab ) ;

	bindings.bind() ; 
}

function createFrontPainter( diy, sheet ){
// TEMPLATE

// PORTRAIT

// STATS

// TEXT
	Name_writer = new createTextBox( 'Name' , diy , sheet ) ;
	Body_writer = new createTextBox( 'Body' , diy , sheet ) ;
	Page_writer = new createTextBox( 'Page' , diy , sheet ) ;
	Bottom_writer = new createTextBox( 'Bottom' , diy , sheet ) ;
	
	updateExternalPortrait( 'Collection' , diy ) ;
	updateExternalPortrait( 'EncounterSet' , diy ) ;
	updateExternalPortrait( 'EncounterSet1' , diy ) ;
	updateExternalPortrait( 'EncounterSet2' , diy ) ;
	updateExternalPortrait( 'EncounterSet3' , diy ) ;
	updateExternalPortrait( 'EncounterSet4' , diy ) ;
	updateExternalPortrait( 'EncounterSet5' , diy ) ;
}

function createBackPainter( diy, sheet ){
// STATS

// TEXT

	updateExternalPortrait( 'PortraitBack' , diy ) ;
}

function paintFront( g, diy, sheet ){

// TEMPLATE
	sheet.paintTemplateImage( g ) ;
	adapterSelector = 0;
	if( $TemplateLayout == 'EncounterSet' ){
		let adapterList = new Array( 'EncounterSet' , 'EncounterSet1' , 'EncounterSet2' , 'EncounterSet3' , 'EncounterSet4' , 'EncounterSet5' ) ;
		for( let index=0 ; index<adapterList.length ; index++ ){
			if( String( $(adapterList[index]) ) != 'Empty' ) adapterSelector++ ;
		}
		debug( 0 , adapterSelector ) ;
		if( adapterSelector > 0 ){ 
			sheet.paintImage( 
				g , 
				ImageUtils.get( CardPath+'Adapter-'+adapterSelector+'.jp2' ) , 
				'Template' 
			) ;
		}
	}

// ICONS
	paintIcon( 'Collection' , g , diy , sheet ) ;

	if( ( $TemplateLayout == 'EncounterSet' ) && ( Number( adapterSelector ) > 0 ) ){ 
		switch( Number( adapterSelector ) ){
		case 6:
			paintIcon('EncounterSet' , g , diy , sheet ) ;
			paintIcon('EncounterSet1' , g , diy , sheet ) ;
			paintIcon('EncounterSet2' , g , diy , sheet ) ;
			paintIcon('EncounterSet3' , g , diy , sheet ) ;
			paintIcon('EncounterSet4' , g , diy , sheet ) ;
			paintIcon('EncounterSet5' , g , diy , sheet ) ;
			break ;
		case 5: 
			sheet.paintImage( g , getIcon( 'EncounterSet' ) , diy.settings.getRegion( 'EncounterSetM1' ) ) ;
			sheet.paintImage( g , getIcon( 'EncounterSet1' ) , diy.settings.getRegion( 'EncounterSetM2' ) ) ;
			sheet.paintImage( g , getIcon( 'EncounterSet2' ) , diy.settings.getRegion( 'EncounterSetM3' ) ) ;
			sheet.paintImage( g , getIcon( 'EncounterSet3' ) , diy.settings.getRegion( 'EncounterSetM4' ) ) ;
			sheet.paintImage( g , getIcon( 'EncounterSet4' ) , diy.settings.getRegion( 'EncounterSetM5' ) ) ;
			break ;
		case 4: 
			sheet.paintImage( g , getIcon( 'EncounterSet' ) , diy.settings.getRegion( 'EncounterSet1-portrait-clip-region' ) ) ;
			sheet.paintImage( g , getIcon( 'EncounterSet1' ) , diy.settings.getRegion( 'EncounterSet2-portrait-clip-region' ) ) ;
			sheet.paintImage( g , getIcon( 'EncounterSet2' ) , diy.settings.getRegion( 'EncounterSet3-portrait-clip-region' ) ) ;
			sheet.paintImage( g , getIcon( 'EncounterSet3' ) , diy.settings.getRegion( 'EncounterSet4-portrait-clip-region' ) ) ;
			break ;
		case 3: 
			sheet.paintImage( g , getIcon( 'EncounterSet' ) , diy.settings.getRegion( 'EncounterSetM2' ) ) ;
			sheet.paintImage( g , getIcon( 'EncounterSet1' ) , diy.settings.getRegion( 'EncounterSetM3' ) ) ;
			sheet.paintImage( g , getIcon( 'EncounterSet2' ) , diy.settings.getRegion( 'EncounterSetM4' ) ) ;
			break ;
		case 2:
			sheet.paintImage( g , getIcon( 'EncounterSet' ) , diy.settings.getRegion( 'EncounterSet2-portrait-clip-region' ) ) ;
			sheet.paintImage( g , getIcon( 'EncounterSet1' ) , diy.settings.getRegion( 'EncounterSet3-portrait-clip-region' ) ) ;
			break ;
		case 1: 
			sheet.paintImage( g , getIcon( 'EncounterSet' ) , diy.settings.getRegion( 'EncounterSetM3' ) ) ;
			break ;
		default:
			break ;
		}
	}

// TEXTS
	if( $TemplateLayout != 'None' ){
		writeTextOutlined( 
			$Name , Name_writer , 
			diy.settings.getRegion( 'Name' ) , selectStroke( 'Name-stroke' , diy ) ,
			g , sheet , diy
		) ;
	}
	
	region = settingToArray( 'Body-region' , 'number' ) ;
	switch( $TemplateLayout ){
	case 'EncounterSet':
		if( Number( adapterSelector ) >= 0 ){ 
			region[1] = Number( region[1] )+40 ;
			region[3] = Number( region[3] )-40 ;
		}
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

	writeLine( 
		'<left><black>'+$CollectionInfo , Bottom_writer , 
		diy.settings.getRegion( 'CollectionInfo' ) , g
	) ;
	writeLine( 
		'<black>'+$Copyright , Bottom_writer , 
		diy.settings.getRegion( 'Copyright' ) , g
	) ;
	if ( Number( $PageNumber ) != 0 ){
		var page = #LRL-Page ;
		if( ($LRL-Page != '') && ($LRL-Page != 'null') ) page = $LRL-Page ;
		page = page+' '+Number( $PageNumber ) ;
		if ( $PageTotal != 0 ) page = page+$LRL-PageOf+$PageTotal ;
		writeLineDecorated(
			page , Page_writer , diy.settings.getRegion( 'Page' ) ,
			ImageUtils.get( ImagePath+'VictoryDecoration.jp2' ) , diy.settings.getRegion( 'PageDecoration' ) ,
			g , sheet 
		) ;
	}
	
	paintCut( g , diy , sheet ) ;
}

function paintBack( g, diy, sheet ){
// TEMPLATE
	sheet.paintTemplateImage( g ) ;
// PORTRAIT
	switch( $PortraitBackSize ){
	case 'Small':
		paintPortrait( 'PortraitBack' , g , diy , sheet ) ;
		sheet.paintImage( 
			g ,
			ImageUtils.get( CardPath+'Overlay-small.jp2' ) ,
			'Template'
		) ;
		break;
	case 'Medium':
		paintPortrait( 'PortraitBack' , g , diy , sheet ) ;
		sheet.paintImage( 
			g ,
			ImageUtils.get( CardPath+'Overlay.jp2' ) ,
			'Template'
		) ;
		break;
	default: 
		break;
	}
// ICONS
	paintIcon( 'Collection' , g , diy , sheet ) ;
// TEXT
	region = settingToArray( 'Body-region' , 'number' ) ;
	switch( $PortraitBackSize ){
	case 'Small':
		region[3] = Number( region[3] )-170 ;
		break;
	case 'Medium':
		region[3] = Number( region[3] )-240 ;
		break;
	default: 
		break;
	}
	writeParagraph(  
		[ 'StoryBack' , 'RulesBack' , 'FlavourBack' ] , Body_writer ,
		new Region( region ) , g , diy 
	) ;

	writeLine( 
		'<left>'+$CollectionInfo , Bottom_writer , 
		diy.settings.getRegion( 'CollectionInfo' ) , g
	) ;
	if( String( $PortraitBackSize ) != 'None' ){
		switch( $ArtistBack ){
		case 'no' :
			text = '' ; 
			break ;
		case '' : 
			if( diy.settings.get( 'LRL-IllustratorUnknown' , '' ) != '' ) text = $LRL-IllustratorUnknown ; 
			else text = #LRL-IllustratorUnknown ; 
			break ;
		default : 
			if( diy.settings.get( 'LRL-IllustratorShort' , '' ) != '' ) text = $LRL-IllustratorShort+' '+$ArtistBack ;
			else text = #LRL-IllustratorShort+' '+$ArtistBack ;
		}
		writeLine( 
			text , Bottom_writer , 
			diy.settings.getRegion( 'ArtistBack' ) , g
		) ;
	}else{
		writeLine( 
			'<black>'+$Copyright , Bottom_writer , 
			diy.settings.getRegion( 'Copyright' ) , g
		) ;
	}
	if ( Number( $PageNumber ) != 0 ){
		var page = #LRL-Page ;
		if( ($LRL-Page != '') && ($LRL-Page != 'null') ) page = $LRL-Page ;
		page = page+' '+Number( Number( $PageNumber ) + 1 ) ;
		if ( $PageTotal != 0 ) page = page+$LRL-PageOf+$PageTotal ;
		writeLineDecorated(
			page , Page_writer , diy.settings.getRegion( 'Page' ) ,
			ImageUtils.get( ImagePath+'VictoryDecoration.jp2' ) , diy.settings.getRegion( 'PageDecoration' ) ,
			g , sheet 
		) ;
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
