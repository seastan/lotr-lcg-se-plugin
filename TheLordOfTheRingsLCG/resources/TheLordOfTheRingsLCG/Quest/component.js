const Card = 'Quest';
// cambiar StageLetter a imagen? y a\u00f1adir selector de letra
const CardVersion = 1 ;
// 1: rewrite using new 2020 library

const TemplateList = new Array(
	'Standard'
	, 'Nightmare' 
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
	Adventure_control = new uiText( 'Adventure' , bindings , [FRONT,BACK] ) ;
	Stage_control = new uiStat( 'Stage' , bindings , 9 , true , [FRONT,BACK] ) ;
	Title_panel.place(
		diy.nameField , 'growx' ,
		@LRL-Adventure , 'newline,split' , 
		Adventure_control , 'growx' ,
		@LRL-Stage, 'split' ,
		Stage_control , 'growx'
	) ;
	Main_tab.place( Title_panel , 'newline,growx' ) ;

	let Effect_panel = new Grid() ;
	Effect_panel.setTitle( @LRL-Effect-panel ) ;
	Story_control = new uiParagraph( 'Story' , bindings, 'medium' ) ;
	Rules_control = new uiParagraph( 'Rules' , bindings, 'big' ) ;
	Condition_control = new uiParagraph( 'Condition' , bindings, 'small' ) ;
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
		
// RULES BACK TAB
	var MainBack_tab = new Grid() ;
	MainBack_tab.editorTabScrolling = true ;

	
	let TitleBack_panel = new Grid() ;
	TitleBack_panel.setTitle( @LRL-Title-panel ) ;
	NameBack_control = new uiText( 'NameBack' , bindings , [BACK] ) ;
//	StageLetter_control = new uiText( 'StageLetter' , bindings ) ;
	TitleBack_panel.place(
		NameBack_control , 'growx'
	) ;
	MainBack_tab.place( TitleBack_panel , 'newline,growx' ) ;
	
	let StatsBack_panel = new Grid() ;
	StatsBack_panel.setTitle( @LRL-Stats-panel ) ;
	Progress_control = new uiStat( 'Progress' , bindings , [BACK] ) ;
	StatsBack_panel.place(
		uiIcon( 'Progress' ) , 'split' , 
		Progress_control , 'growx'
	) ;
	MainBack_tab.place( StatsBack_panel , 'newline,growx' ) ;
	
	let EffectBack_panel = new Grid() ;
	EffectBack_panel.setTitle( @LRL-Effect-panel ) ;
	StoryBack_control = new uiParagraph( 'StoryBack' , bindings , 'medium' , [BACK] ) ;
	RulesBack_control = new uiParagraph( 'RulesBack' , bindings , 'big' , [BACK] ) ;
	ConditionBack_control = new uiParagraph( 'ConditionBack' , bindings , 'small' , [BACK] ) ;
	EffectBack_panel.place(
		@LRL-Story, 'center' , 
		StoryBack_control , 'newline,growx' ,
		@LRL-Rules, 'newline,center' , 
		RulesBack_control , 'newline,growx' ,
		@LRL-Condition, 'newline,center' , 
		ConditionBack_control , 'newline,growx'
	) ;
	MainBack_tab.place( EffectBack_panel , 'newline,growx' ) ;
	
	let EffectAdvancedBack_panel = new Grid() ;
	EffectAdvancedBack_panel.setTitle( @LRL-EffectAdvanced-panel ) ;
	OptionRightBack_control = new uiText( 'OptionRightBack' , bindings , [BACK] ) ;
	EffectAdvancedBack_panel.place(
		@LRL-OptionRight , 'split' ,
		OptionRightBack_control , 'growx'
	) ;
	MainBack_tab.place( EffectAdvancedBack_panel , 'newline,growx' ) ;
	
	MainBack_tab.addToEditor( editor , @LRL-MainBack-tab ) ;
	
// ENCOUNTER SET TAB
	var EncounterSet_tab = new Grid() ; 
	EncounterSet_tab.editorTabScrolling = true ;
	
	let EncounterSet_panel = new Grid() ;
	EncounterSet_panel.setTitle( @LRL-EncounterSet-panel ) ;
	EncounterSet_control = new uiIconList( 'EncounterSet' , GO.DefaultIconList.concat( GO.EncounterSetList ) , bindings , [FRONT,BACK] ) ;
	EncounterSetPortrait_control = new uiPortrait( 'EncounterSet' , diy ) ;
	EncounterSet_panel.place(
		EncounterSet_control , 'growx' ,
		EncounterSetPortrait_control , 'newline,growx'
	) ;
	EncounterSet_tab.place( EncounterSet_panel , 'newline,growx' ) ;
	
	let EncounterSet1_panel = new Grid() ;
	EncounterSet1_panel.setTitle( @LRL-EncounterSet1-panel ) ;
	EncounterSet1_control = new uiIconList( 'EncounterSet1' , GO.DefaultIconList.concat( GO.EncounterSetList ) , bindings ) ;
	EncounterSet1Portrait_control = new uiPortrait( 'EncounterSet1' , diy ) ;
	EncounterSet1_panel.place(
		EncounterSet1_control , 'growx' ,
		EncounterSet1Portrait_control , 'newline,growx'
	) ;
	EncounterSet_tab.place( EncounterSet1_panel , 'newline,growx' ) ;

	let EncounterSet2_panel = new Grid() ;
	EncounterSet2_panel.setTitle( @LRL-EncounterSet2-panel ) ;
	EncounterSet2_control = new uiIconList( 'EncounterSet2' , GO.DefaultIconList.concat( GO.EncounterSetList ) , bindings ) ;
	EncounterSet2Portrait_control = new uiPortrait( 'EncounterSet2' , diy ) ;
	EncounterSet2_panel.place(
		EncounterSet2_control , 'growx' ,
		EncounterSet2Portrait_control , 'newline,growx'
	) ;
	EncounterSet_tab.place( EncounterSet2_panel , 'newline,growx' ) ;
	
	let EncounterSet3_panel = new Grid() ;
	EncounterSet3_panel.setTitle( @LRL-EncounterSet3-panel ) ;
	EncounterSet3_control = new uiIconList( 'EncounterSet3' , GO.DefaultIconList.concat( GO.EncounterSetList ) , bindings ) ;
	EncounterSet3Portrait_control = new uiPortrait( 'EncounterSet3' , diy ) ;
	EncounterSet3_panel.place(
		EncounterSet3_control , 'growx' ,
		EncounterSet3Portrait_control , 'newline,growx'
	) ;
	EncounterSet_tab.place( EncounterSet3_panel , 'newline,growx' ) ;
	
	let EncounterSet4_panel = new Grid() ;
	EncounterSet4_panel.setTitle( @LRL-EncounterSet4-panel ) ;
	EncounterSet4_control = new uiIconList( 'EncounterSet4' , GO.DefaultIconList.concat( GO.EncounterSetList ) , bindings ) ;
	EncounterSet4Portrait_control = new uiPortrait( 'EncounterSet4' , diy ) ;
	EncounterSet4_panel.place(
		EncounterSet4_control , 'growx' ,
		EncounterSet4Portrait_control , 'newline,growx'
	) ;
	EncounterSet_tab.place( EncounterSet4_panel , 'newline,growx' ) ;
	
	let EncounterSet5_panel = new Grid() ;
	EncounterSet5_panel.setTitle( @LRL-EncounterSet5-panel ) ;
	EncounterSet5_control = new uiIconList( 'EncounterSet5' , GO.DefaultIconList.concat( GO.EncounterSetList ) , bindings ) ;
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
	PortraitTint_control = new uiButtonText( 'PortraitTint' , diy , bindings ) ;
	PortraitMirror_control = new uiPortraitMirror( 'Portrait' , Portrait_control ) ;
	PortraitShadow_control = new uiCycler( 
		'PortraitShadow' ,
		[ 'None' , 'PortraitTint' , 'Black' , 'Custom' ] ,
		bindings , [FRONT,BACK]
	);
	Artist_control = new uiText( 'Artist' , bindings ) ;
	Portrait_panel.place(
		@LRL-Artist , 'split' ,
		Artist_control , 'growx' ,
		Portrait_control , 'newline,growx' ,
		@LRL-PortraitShadow , 'newline,split' ,
		PortraitShadow_control , 'growx' ,
		PortraitTint_control , '' ,
		PortraitMirror_control , ''
	) ;
	Portrait_tab.place( Portrait_panel , 'newline,growx' ) ;
	
	let PortraitBack_panel = new Grid() ;
	PortraitBack_panel.setTitle( @LRL-PortraitBack-panel ) ;
	PortraitBack_control = new uiPortrait( 'PortraitBack' , diy ) ;
	PortraitShare_control = new uiButtonText( 'PortraitShare' , diy , bindings , [BACK] ) ;
	PortraitBackMirror_control = new uiPortraitMirror( 'PortraitBack' , PortraitBack_control ) ;
	PortraitBackShadow_control = new uiCycler( 
		'PortraitBackShadow' ,
		[ 'None' , 'Black' , 'Custom' ] ,
		bindings , [FRONT,BACK]
	);
	ArtistBack_control = new uiText( 'ArtistBack' , bindings , [BACK] ) ;
	PortraitBack_panel.place(
		PortraitShare_control , 'split' ,
		@LRL-Artist , '' ,
		ArtistBack_control , 'growx' ,
		PortraitBack_control , 'newline,growx' ,
		@LRL-PortraitShadow , 'newline,split' ,
		PortraitBackShadow_control , 'growx' ,
		PortraitBackMirror_control , ''
	) ;
	Portrait_tab.place( PortraitBack_panel , 'newline,growx' ) ;

	Portrait_tab.addToEditor( editor , @LRL-Portrait-tab ) ;
	
// COLLECTION TAB
	var Collection_tab = new Grid() ; 
	Collection_tab.editorTabScrolling = true ;
	
	let Collection_panel = new Grid() ;
	Collection_panel.setTitle( @LRL-Collection-panel ) ;
	CollectionNumber_control = new uiSpinner( 'CollectionNumber' , bindings , 999 , [FRONT,BACK] ) ;
	CollectionInfo_control = new uiText( 'CollectionInfo' , bindings , [FRONT,BACK] ) ;
	Collection_control = new uiIconList( 'Collection' , GO.DefaultIconList.concat( GO.CollectionList ) , bindings , [FRONT,BACK] ) ;
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
	Copyright_control = new uiText( 'Copyright' , bindings , [FRONT,BACK] ) ;
	Copyright_panel.place(
		Copyright_control , 'growx' 
	) ;
	Collection_tab.place( Copyright_panel , 'newline,growx' ) ;

	Collection_tab.addToEditor( editor , @LRL-Collection-tab ) ;

	bindings.bind() ; 
}

function createFrontPainter( diy, sheet ){
	
	PortraitShadow_tinter = new createTinter( 'Portrait-shadow' , diy ) ;

// TEMPLATE
	Difficulty_tinter = new createTinter( 'Difficulty' , diy ) ;

// STATS
	Stage_tinter = new createTinter( 'Stage' , diy ) ;

// TEXT
	Name_writer = new createTextBox( 'Name' , diy , sheet ) ;
	Adventure_writer = new createTextBox( 'Adventure' , diy , sheet ) ;
	Body_writer = new createTextBox( 'Body' , diy , sheet ) ;
	Option_writer = new createTextBox( 'Option' , diy , sheet ) ;
	Bottom_writer = new createTextBox( 'Bottom' , diy , sheet ) ;
	EncounterSetNumber_writer = new createTextBox( 'EncounterSetNumber' , diy , sheet ) ;
	
	updateExternalPortrait( 'Portrait' , diy ) ;
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
	Progress_tinter = new createTinter( 'Progress' , diy ) ;

// TEXT
	updateExternalPortrait( 'PortraitBack' , diy ) ;
}

function paintFront( g, diy, sheet ){

// PORTRAIT
	if( diy.settings.getBoolean( 'PortraitTint' , true ) === true ){
		index = portraitIndexOf( 'Portrait' ) ;
		var imageTinted = PortraitList[ index ].getImage() ;
		var imagePanX = PortraitList[ index ].getPanX() ;
		var imagePanY = PortraitList[ index ].getPanY() ;
		var imageRotation = PortraitList[ index ].getRotation() ;
		var imageScale = PortraitList[ index ].getScale() ;
		
		if( $Template == 'Nightmare' ) imageTinted = createRedishImage( imageTinted ) ;
		else imageTinted = createSepiaImage( imageTinted ) ;

		var region = settingToArray( 'Portrait-portrait-clip-region' ) ;
		var AT = java.awt.geom.AffineTransform;	
		var transform =	AT.getTranslateInstance(
			Number(region[0])+(Number(region[2])/2)+imagePanX-((imageTinted.width*imageScale)/2),
			Number(region[1])+(Number(region[3])/2)+imagePanY-((imageTinted.height*imageScale)/2)
		);
		transform.concatenate(AT.getScaleInstance(imageScale,imageScale));
		transform.concatenate(AT.getRotateInstance(-imageRotation * Math.PI/180,imageTinted.width/2,imageTinted.height/2));
		g.drawImage( imageTinted , transform , null ) ;
	}else{ paintPortrait( 'Portrait' , g , diy , sheet ) ; }

	switch(String($PortraitShadow)){
	case 'None' : break ;
	case 'Black' :
		sheet.paintImage( g , 'Portrait-shadow' , 'Template' ) ;
		break ;
	case 'PortraitTint' :
		if( diy.settings.getBoolean('PortraitTint') ){
			if( $Template == 'Nightmare' ){ 
				sheet.paintImage( 
					g , createRedishImage( diy.settings.getImageResource( 'Portrait-shadow-tintable' ) ) , 
					'Template' 
				) ;
			}else{
				sheet.paintImage( 
					g , createSepiaImage( diy.settings.getImageResource( 'Portrait-shadow-tintable' ) ) , 
					'Template' 
				) ;
			}
		}else{
			sheet.paintImage( g , 'Portrait-shadow' , 'Template' ) ;
		}
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
	let adapterList = new Array( 'EncounterSet1' , 'EncounterSet2' , 'EncounterSet3' , 'EncounterSet4' , 'EncounterSet5' ) ;
	let adapterSelector = 0;
	for( let index=0 ; index<adapterList.length ; index++ ) if( $(adapterList[index]) != 'Empty' ) adapterSelector=index+1 ;
	
	paintTemplate( g , sheet ) ;
	sheet.paintImage( g , ImageUtils.get( CardPath+$Template+'-Adapter-'+adapterSelector+'.jp2' ) , 'Template' ) ;

// ICONS
	paintIcon( 'Collection' , g , diy , sheet ) ;
	paintIcon( 'EncounterSet' , g , diy , sheet ) ;
	paintIcon( 'EncounterSet1' , g , diy , sheet ) ;
	paintIcon( 'EncounterSet2' , g , diy , sheet ) ;
	paintIcon( 'EncounterSet3' , g , diy , sheet ) ;
	paintIcon( 'EncounterSet4' , g , diy , sheet ) ;
	paintIcon( 'EncounterSet5' , g , diy , sheet ) ;

// STATS
	Stage_tinter.setImage( ImageUtils.get( NumberTintablePath+$Stage+'a.png' ) ) ;
	sheet.paintImage( g , Stage_tinter.getTintedImage() , 'Stage' ) ;
	
// TEXTS
	writeName( g , diy ) ;
	writeAdventure( g , diy	) ;
	if ( $OptionRight != '' ){
		writeOptionRight( g , sheet , diy ) ;
		Body_writer.setPageShape( diy.settings.getCupShape( 'Option-Body-shape' ) ) ;
	}else{
		Body_writer.setPageShape( PageShape.RECTANGLE_SHAPE ) ;
	}
	writeBody( [ 'Story' , 'Rules' , 'Condition' ] , g , diy ) ;

	writeArtist( g , sheet , diy ) ;
	writeCopyright( g , sheet , diy ) ;
	writeCollectionInfo( g , sheet , diy ) ;
	if( diy.settings.getBoolean('CollectionNumberHide' , false ) == true ){
		writeTextOutlined( 
			'<left>---' , Bottom_writer , 
			diy.settings.getRegion( 'CollectionNumber' ) , selectStroke( 'Bottom-stroke' , diy ) , 
			g , sheet , diy 
		) ;
	}else{ 
		writeCollectionNumber( g , sheet , diy ) ;
	}
	
	paintCut( g , diy , sheet ) ;
}

function paintBack( g, diy, sheet ){
// PORTRAIT
	if(diy.settings.getBoolean( 'PortraitShare' , true ) === true ){
		paintPortrait( 'Portrait' , g , diy , sheet ) ;
	}else{
		paintPortrait( 'PortraitBack' , g , diy , sheet ) ;
	}
	switch(String($PortraitBackShadow)){
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
	switch( $Template ) {
	case 'Standard' :
	case 'Gold' :
	case 'Custom' :
		sheet.paintTemplateImage( g ) ;
		break;
	default :
		sheet.paintImage( 
			g , ImageUtils.get( CardPath+$Template+'Back.jp2' ) , 
			'Template'
		) ; 
	}

// ICONS
	paintIcon( 'Collection' , g , diy , sheet ) ;
	paintIcon( 'EncounterSet' , g , diy , sheet ) ;

// STATS
	Stage_tinter.setImage( ImageUtils.get( NumberTintablePath+$Stage+'b.png' ) ) ;
	sheet.paintImage( g , Stage_tinter.getTintedImage() , 'Stage' ) ;
	paintStatTinted( 'Progress' , Progress_tinter , g , sheet ) ;
	
// TEXTS
	if( $NameBack == '' ){
		writeName( g , diy ) ;
	}else{
		writeLine( 
			$NameBack , Name_writer , 
			diy.settings.getRegion( 'Name' ) , g 
		) ;
	}
	writeAdventure( g , diy	) ;
	if ( $OptionRightBack != '' ){
		writeLineDecorated(
			$OptionRightBack , Option_writer , diy.settings.getRegion( 'OptionRight' ) ,
			ImageUtils.get( ImagePath+'VictoryDecoration.jp2' ) , diy.settings.getRegion( 'OptionRightDecoration' ) ,
			g , sheet 
		) ;
		Body_writer.setPageShape( diy.settings.getCupShape( 'Option-Body-shape' ) ) ;
	}else{
		Body_writer.setPageShape( PageShape.RECTANGLE_SHAPE ) ;
	}
	writeBody( [ 'StoryBack' , 'RulesBack' , 'ConditionBack' ] , g , diy ) ;

	if( diy.settings.getBoolean( 'PortraitShare' , true ) === true ){
		writeArtist( g , sheet , diy ) ;
	}else{
		switch( $ArtistBack ){
		case 'no' : text = '' ; break ;
		case '' : 
			if( diy.settings.get( 'LRL-IllustratorUnknown' , '' ) != '' ) text = $LRL-IllustratorUnknown ; 
			else text = #LRL-IllustratorUnknown ; 
			break ;
		default : 
			if( diy.settings.get( 'LRL-IllustratorShort' , '' ) != '' ) text = $LRL-IllustratorShort+' '+$ArtistBack ;
			else text = #LRL-IllustratorShort+' '+$ArtistBack ;
		}
		writeTextOutlined( 
			'<left>'+text , Bottom_writer , 
			diy.settings.getRegion( 'Artist' ) , selectStroke( 'Bottom-stroke' , diy ) , 
			g , sheet , diy 
		) ;
	}
	
	writeCopyright( g , sheet , diy ) ;
	writeCollectionInfo( g , sheet , diy ) ;
	writeCollectionNumberBack( g , sheet , diy ) ;

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
