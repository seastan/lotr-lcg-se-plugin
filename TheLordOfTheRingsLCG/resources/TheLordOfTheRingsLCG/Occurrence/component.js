const Card = 'Occurrence';
// corregir tama\u00f1o icono de conjunto
// comprobar si texto complexocurrence es necesario
const CardVersion = 1 ;
// 1: rewrite using new 2020 library

const TemplateList = new Array(
	'Standard' 
	, 'Complex'
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
	
	let Effect_panel = new Grid() ;
	Effect_panel.setTitle( @LRL-Effect-panel ) ;
	Story_control = new uiParagraph( 'Story' , bindings ) ;
	Rules_control = new uiParagraph( 'Rules' , bindings ) ;
	Success_control = new uiParagraph( 'Success' , bindings , 'small' ) ;
	Failure_control = new uiParagraph( 'Failure' , bindings , 'small' ) ;
	Flavour_control = new uiParagraph( 'Flavour' , bindings , 'small' ) ;
	Effect_panel.place(
		@LRL-Story , 'center' , 
		Story_control , 'newline,growx' ,
		@LRL-Rules , 'newline,center' , 
		Rules_control , 'newline,growx' ,
		@LRL-Success, 'newline,center' , 
		Success_control , 'newline,growx' ,
		@LRL-Failure, 'newline,center' , 
		Failure_control , 'newline,growx' ,
		@LRL-Flavour, 'newline,center' , 
		Flavour_control , 'newline,growx'
	) ;
	Main_tab.place( Effect_panel , 'newline,growx' ) ;
	
	Main_tab.addToEditor( editor , @LRL-Main-tab ) ;
	
// ENCOUNTER SET TAB
	var EncounterSet_tab = new Grid() ; 
	EncounterSet_tab.editorTabScrolling = true ;
	
	let EncounterSet_panel = new Grid() ;
	EncounterSet_panel.setTitle( @LRL-EncounterSet-panel ) ;
	EncounterSet_control = new uiIconList( 'EncounterSet' , GO.DefaultIconList.concat( GO.EncounterSetList ) , bindings ) ;
	EncounterSetPortrait_control = new uiPortrait( 'EncounterSet' , diy ) ;
	Difficulty_control = new uiIconList( 'Difficulty' , DifficultyList , bindings ) ;
	EncounterSet_panel.place(
		EncounterSet_control , 'growx' ,
		@LRL-Difficulty, 'newline,split' ,
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
	
	
	let Region_panel = new Grid() ;
	Region_panel.setTitle( @LRL-Region-panel ) ;
	RegionList = new Array( 'Red' , 'Green' , 'Blue' , 'Yellow' , 'Brown' , 'Purple' , 'White' , 'Black' , 'Custom' , 'Empty' ) ;
	Region_control = new uiIconList( 'Region' , RegionList , bindings , [ BACK ] ) ;
	Region_panel.place(
		Region_control , 'growx'
	) ;
	Template_tab.place( Region_panel , 'newline,growx' ) ;

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
	Other_panel.place(
		@LRL-Type , 'split' ,
		Type_control , 'growx'
	) ;
	Collection_tab.place( Other_panel , 'newline,growx' ) ;

	Collection_tab.addToEditor( editor , @LRL-Collection-tab ) ;

	bindings.bind() ; 
}

function createFrontPainter( diy, sheet ){
// TEMPLATE
	Difficulty_tinter = new createTinter( 'Difficulty' , diy ) ;

// TEXT
	Name_writer = new createTextBox( 'Name' , diy , sheet ) ;
	Body_writer = new createTextBox( 'Body' , diy , sheet ) ;
	Option_writer = new createTextBox( 'Option' , diy , sheet ) ;
	Type_writer = new createTextBox( 'Type' , diy , sheet ) ;
	Bottom_writer = new createTextBox( 'Bottom' , diy , sheet ) ;

	updateExternalPortrait( 'Portrait' , diy ) ;
	updateExternalPortrait( 'Collection' , diy ) ;
	updateExternalPortrait( 'EncounterSet' , diy ) ;

}	

function createBackPainter( diy, sheet ){
// TEMPLATE
	Region_tinter = new createTinter( 'Region' , diy ) ;
}

function paintFront( g, diy, sheet ){

// PORTRAIT
	paintPortrait( 'Portrait' , g , diy , sheet ) ;

// TEMPLATE
	paintTemplate( g , sheet ) ;

	if( $EncounterSet != 'Empty' ){
		sheet.paintImage( 
			g , ImageUtils.get(ImagePath+'SetDecoration.jp2') , 
			'Difficulty' 
		) ;
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
	}

// ICONS
	paintIcon( 'Collection' , g , diy , sheet ) ;
	paintIcon( 'EncounterSet' , g , diy , sheet ) ;

// TEXTS
	if( $EncounterSet != 'Empty' ) region = diy.settings.getRegion( 'Name' ) ;
	else region = diy.settings.getRegion( 'Full-Name' ) ;
	writeLine( $Name , Name_writer , region , g ) ;
	
	writeParagraph(  
		[ 'Story' ] , Body_writer ,
		diy.settings.getRegion( 'Story' ) , g , diy 
	) ;
	if( $Template == 'Complex' ) {
		writeParagraph(  
			[ 'Rules' , 'Flavour' ] , Body_writer ,
			diy.settings.getRegion( 'Complex-Body' ) , g , diy 
		) ;
		writeParagraph(  
			[ 'Success' ] , Body_writer ,
			diy.settings.getRegion( 'Success' ) , g , diy 
		) ;
		writeParagraph(  
			[ 'Failure' ] , Body_writer ,
			diy.settings.getRegion( 'Failure' ) , g , diy 
		) ;
	}else{
		writeBody( [ 'Rules' , 'Flavour' ] , g , diy ) ;
	}
	
	if( diy.settings.get( 'Template ' ) == 'Complex' ){
		if(  diy.settings.get( 'Type' , '' ) == '' ) text = #LRL-OccurrenceComplex ;
		else text = $Type ;
		writeLine( 
			text , Type_writer , 
			diy.settings.getRegion( 'Type' ) , g 
		) ;
	}else{ 	
		writeType( g , diy ) ;
 	}
	
	writeArtist( g , sheet , diy ) ;
	writeCopyright( g , sheet , diy ) ;
	writeCollectionInfo( g , sheet , diy ) ;
	writeCollectionNumber( g , sheet , diy ) ;

	paintCut( g , diy , sheet ) ;
}

function paintBack( g, diy, sheet ){
// TEMPLATE
	sheet.paintTemplateImage( g ) ;
	
	var hsb;
	switch( $Region ){
	case 'Empty' : break ;
	case 'Custom' :
		hsb = diy.settings.getTint( 'Region' ) ;
		Region_tinter.setFactors( hsb[0] , hsb[1] , hsb[2] ) ;
		sheet.paintImage( g , Region_tinter.getTintedImage() , 'Template' ) ;
		break;
	default :
		hsb = diy.settings.getTint( $Region ) ;
		sheet.paintImage( 
			g , 
			ImageUtils.get( CardPath+$Region+'.jp2' ) , 
			'Template' 
		) ;
		break;
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
