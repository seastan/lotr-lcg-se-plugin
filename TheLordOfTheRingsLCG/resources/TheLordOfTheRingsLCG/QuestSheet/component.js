const Card = 'QuestSheet';
// cambiar StageLetter a imagen? y a\u00f1adir selector de letra
const CardVersion = 1 ;
// 1: rewrite using new 2020 library

const TemplateList = new Array( 'Standard' ) ;

function create( diy ){
	diy.extensionName = 'TheLordOfTheRingsLCG.seext' ;
	diy.version = LibraryVersion+CardVersion ;
	$VersionHistory = diy.version ;
	
	loadSettings( diy ) ;
	loadExample( diy ) ;
	
	diy.frontTemplateKey = 'Template' ;
	diy.faceStyle = FaceStyle.ONE_FACE ;
	diy.bleedMargin = 0 ;
	
	diy.customPortraitHandling = true ;
	createPortrait( 'Portrait' , diy ) ;
	createPortrait( 'Collection' , diy ) ;
	createPortrait( 'EncounterSet' , diy ) ;
	createPortrait( 'EncounterSet1' , diy ) ;
	createPortrait( 'EncounterSet2' , diy ) ;
	createPortrait( 'EncounterSet3' , diy ) ;
	createPortrait( 'EncounterSet4' , diy ) ;
	createPortrait( 'EncounterSet5' , diy ) ;
	$PortraitListCount = getPortraitCount() ;
}

function createInterface( diy, editor, sheet ){
	var bindings = new Bindings( editor , diy ) ;
	
// RULES TAB
	var MainLeft_tab = new Grid() ;
	MainLeft_tab.editorTabScrolling = true ;
		
//		@LRL-Page, 'newline,split' ,
//		Page_control , '',
	uiName( diy , bindings ) ;
	Adventure_control = new uiText( 'Adventure' , bindings ) ;
	Stage_control = new uiStat( 'Stage' , bindings ) ;
	MainLeft_tab.place(
		@LRL-Title, 'split' ,
		diy.nameField , 'growx' ,
		separator(), 'newline,growx' 
	) ;
	
	Story_control = new uiParagraph( 'Story' , bindings ) ;
	Rules_control = new uiParagraph( 'Rules' , bindings , 'huge' ) ;
	Flavour_control = new uiParagraph( 'Flavour' , bindings , 'small' ) ;
	MainLeft_tab.place(
		@LRL-Story, 'newline,center' , 
		Story_control , 'newline,growx' ,
		@LRL-Rules, 'newline,center' , 
		Rules_control , 'newline,growx' ,
		@LRL-Flavour, 'newline,center' , 
		Flavour_control , 'newline,growx' ,
		separator(), 'newline,growx' 
	) ;

	MainLeft_tab.addToEditor( editor , @LRL-MainLeft-tab ) ;
	
// RULES TAB
	var MainRight_tab = new Grid() ;
	MainRight_tab.editorTabScrolling = true ;
	
	StoryRight_control = new uiParagraph( 'StoryRight' , bindings ) ;
	RulesRight_control = new uiParagraph( 'RulesRight' , bindings , 'huge' ) ;
	FlavourRight_control = new uiParagraph( 'FlavourRight' , bindings , 'small' ) ;
	MainRight_tab.place(
		@LRL-Story, 'newline,center' , 
		StoryRight_control , 'newline,growx' ,
		@LRL-Rules, 'newline,center' , 
		RulesRight_control , 'newline,growx' ,
		@LRL-Flavour, 'newline,center' , 
		FlavourRight_control , 'newline,growx' ,
		separator(), 'newline,growx' 
	) ;

	MainRight_tab.addToEditor( editor , @LRL-MainRight-tab ) ;
	
// TEMPLATE TAB
	var Template_tab = new Grid() ;
	Template_tab.editorTabScrolling = true ;
	
	TitleLayout_control = new uiCycler( 
		'TitleLayout' ,
		[ 'Plain' , 'Logo' , 'Title' , 'Sets' ] ,
		bindings
	);

	TemplateTint_control = new uiTint( 'Template' , bindings ) ;
	Template_tab.place(
		@LRL-uiCycler-TitleLayout, 'newline,split' ,
		TitleLayout_control , '' ,
		separator(), 'newline,growx' ,
		TemplateTint_control , 'newline,growx',
		separator(), 'newline,growx' 
	) ;
	
	Template_tab.addToEditor( editor , @LRL-Template-tab ) ;

// PORTRAIT TAB
	var Portrait_tab = new Grid() ;
	Portrait_tab.editorTabScrolling = true ;
	
	Portrait_control = new uiPortrait( 'Portrait' , diy ) ;
	PortraitMirror_control = new uiPortraitMirror( 'Portrait' , Portrait_control ) ;
	Artist_control = new uiText( 'Artist' , bindings ) ;
	PortraitLayout_control = new uiCycler( 
		'PortraitLayout' ,
		[ 'None' , 'Medium' , 'Small' ] ,
		bindings
	);

	Portrait_tab.place(
		@LRL-Artist , 'split' ,
		Artist_control , 'growx' ,
		Portrait_control , 'newline,growx' ,
		@LRL-uiCycler-PortraitLayout, 'newline,split' ,
		PortraitLayout_control , 'growx' ,
		PortraitMirror_control , '' 
	) ;
	
	Portrait_tab.addToEditor( editor , @LRL-Portrait-tab ) ;
	
// ENCOUNTER SET TAB
	var EncounterSet_tab = new Grid() ; 
	EncounterSet_tab.editorTabScrolling = true ;
	
	var iconCombo = createCombo( GO.DefaultIconList.concat( GO.EncounterSetList ) ) ;
	
	EncounterSet_control = new uiIconCombo( 'EncounterSet' , iconCombo , bindings ) ;
	EncounterSetPortrait_control = new uiPortrait( 'EncounterSet' , diy ) ;
	EncounterSet_tab.place(
		@LRL-EncounterSet, 'newline,split' ,
		EncounterSet_control , 'growx' ,
		EncounterSetPortrait_control , 'newline' ,
		separator(), 'newline,growx' 
	) ;
	
	EncounterSet1_control = new uiIconCombo( 'EncounterSet1' , iconCombo , bindings ) ;
	EncounterSet1Portrait_control = new uiPortrait( 'EncounterSet1' , diy ) ;
	EncounterSet_tab.place(
		@LRL-EncounterSet1, 'newline,split' ,
		EncounterSet1_control , 'growx' ,
		EncounterSet1Portrait_control , 'newline' ,
		separator(), 'newline,growx' 
	) ;
	
	EncounterSet2_control = new uiIconCombo( 'EncounterSet2' , iconCombo , bindings ) ;
	EncounterSet2Portrait_control = new uiPortrait( 'EncounterSet2' , diy ) ;
	EncounterSet_tab.place(
		@LRL-EncounterSet2, 'newline,split' ,
		EncounterSet2_control , 'growx' ,
		EncounterSet2Portrait_control , 'newline' ,
		separator(), 'newline,growx' 
	) ;
	
	EncounterSet3_control = new uiIconCombo( 'EncounterSet3' , iconCombo , bindings ) ;
	EncounterSet3Portrait_control = new uiPortrait( 'EncounterSet3' , diy ) ;
	EncounterSet_tab.place(
		@LRL-EncounterSet3, 'newline,split' ,
		EncounterSet3_control , 'growx' ,
		EncounterSet3Portrait_control , 'newline' ,
		separator(), 'newline,growx' 
	) ;
	
	EncounterSet4_control = new uiIconCombo( 'EncounterSet4' , iconCombo , bindings ) ;
	EncounterSet4Portrait_control = new uiPortrait( 'EncounterSet4' , diy ) ;
	EncounterSet_tab.place(
		@LRL-EncounterSet4, 'newline,split' ,
		EncounterSet4_control , 'growx' ,
		EncounterSet4Portrait_control , 'newline' ,
		separator(), 'newline,growx' 
	) ;
	
	EncounterSet5_control = new uiIconCombo( 'EncounterSet5' , iconCombo , bindings ) ;
	EncounterSet5Portrait_control = new uiPortrait( 'EncounterSet5' , diy ) ;
	EncounterSet_tab.place(
		@LRL-EncounterSet5, 'newline,split' ,
		EncounterSet5_control , 'growx' ,
		EncounterSet5Portrait_control , 'newline' ,
		separator(), 'newline,growx' 
	) ;
	
	EncounterSet_tab.addToEditor( editor , @LRL-EncounterSet-tab ) ;

// COLLECTION TAB
	var Collection_tab = new Grid() ; 
	Collection_tab.editorTabScrolling = true ;
	
	Page_control = new uiSpinner( 'Page' , bindings ) ;
	Collection_control = new uiIconList( 'Collection' , GO.DefaultIconList.concat( GO.CollectionList ) , bindings ) ;
	CollectionPortrait_control = new uiPortrait( 'Collection' , diy ) ;
	CollectionInfo_control = new uiText( 'CollectionInfo' , bindings ) ;
	Collection_tab.place(
		Collection_control , 'growx' ,
		@LRL-Information , 'newline,split' ,
		CollectionInfo_control , 'growx' ,
		CollectionPortrait_control , 'newline,growx'
	) ;
	
	Copyright_control = new uiText( 'Copyright' , bindings ) ;
	GameName_control = new uiText( 'GameName' , bindings ) ;
	Collection_tab.place(
		@LRL-Copyright, 'newline,split' ,
		Copyright_control , 'growx' ,
		@LRL-GameName, 'newline,split' ,
		GameName_control , 'growx' ,
		separator(), 'newline,growx' 
	) ;

	Collection_tab.addToEditor( editor , @LRL-Collection-tab ) ;

	bindings.bind() ; 

}

function createFrontPainter( diy, sheet ){
// TEMPLATE
	Template_tinter = new createTinter( 'Template' , diy ) ;
	Template_tinter.setImage( ImageUtils.get( ImagePath+'campaignColour-tintable.png' ) ) ;

// TEXT
	Page_tinter = new createTinterVariable( diy ) ;
	Name_writer = new createTextBox( 'Name' , diy , sheet ) ;
	GameName_writer = new createTextBox( 'GameName' , diy , sheet ) ;
	BodyLeft_writer = new createTextBox( 'BodyLeft' , diy , sheet ) ;
	BodyLeft_writer = new createTextBox( 'BodyRight' , diy , sheet ) ;
	Artist_writer = new createTextBox( 'Artist' , diy , sheet ) ;
	Copyright_writer = new createTextBox( 'Copyright' , diy , sheet ) ;
	CollectionInfo_writer = new createTextBox( 'CollectionInfo' , diy , sheet ) ;
	
}
function paintFront( g, diy, sheet ){
// TEMPLATE
	sheet.paintTemplateImage( g ) ;
	
	var hsb = diy.settings.getTint( 'Template' ) ;
	Template_tinter.setFactors( hsb[0] , hsb[1] , hsb[2] ) ;
	image = Template_tinter.getTintedImage() ;
	sheet.paintImage( g , image , Card+'-campaignColourTL' ) ;
	sheet.paintImage( g , image , Card+'-campaignColourTR' ) ;
	sheet.paintImage( g , image , Card+'-campaignColourBL' ) ;
	sheet.paintImage( g , image , Card+'-campaignColourBR' ) ;
	
// PORTRAIT
	if( $PortraitLayout !=  'none' ){
		paintPortrait( 'Portrait' , g , sheet ) ;
		sheet.paintImage( g , 'QuestSheet-overlay-'+$PortraitLayout , 'QuestSheet-Portrait-portrait-clip' ) ;
	}
	
// ICONS
	paintIcon( 'Collection' , g , sheet ) ;
	
	switch( $TitleLayout ){
	case 'Sets':
		let adapterList = new Array( 'EncounterSet1' , 'EncounterSet2' , 'EncounterSet3' , 'EncounterSet4' , 'EncounterSet5' ) ;
		let adapterSelector = 0;
		for( let index=1 ; index<adapterList.length ; index++ ) if( $(adapterList[index]) != 'Empty' ) adapterSelector=index+1 ;
		sheet.paintImage( g , ImageUtils.get( CardPath+'adapter-'+adapterSelector ) , Card+'-adapter' ) ;
		
		let ESregion = settingToArray('QuestSheet-EncounterSet-portrait-clip-region');
		let ES1region = settingToArray('QuestSheet-EncounterSet1-portrait-clip-region');
		let ES2region = settingToArray('QuestSheet-EncounterSet2-portrait-clip-region');
		let ES3region = settingToArray('QuestSheet-EncounterSet3-portrait-clip-region');
		let ES4region = settingToArray('QuestSheet-EncounterSet4-portrait-clip-region');
		let ES5region = settingToArray('QuestSheet-EncounterSet5-portrait-clip-region');
		switch( adapterSelector ){
		case 0 : break ;
		case 1 : case 3 : case 5 :
			ESregion[0] = Number(ESregion[0])+Number($QuestSheet-adapter-corrector);
			ES1region[0] = Number(ES1region[0])+Number($QuestSheet-adapter-corrector);
			ES2region[0] = Number(ES2region[0])+Number($QuestSheet-adapter-corrector);
			ES3region[0] = Number(ES3region[0])+Number($QuestSheet-adapter-corrector);
			ES4region[0] = Number(ES4region[0])+Number($QuestSheet-adapter-corrector);
			ES5region[0] = Number(ES5region[0])+Number($QuestSheet-adapter-corrector);
		case 2: case 4: case 6: 
			ESregion = new Region([Number(ESregion[0]),Number(ESregion[1]),Number(ESregion[2]),Number(ESregion[3])]);
			ES1region = new Region([Number(ES1region[0]),Number(ES1region[1]),Number(ES1region[2]),Number(ES1region[3])]);
			ES2region = new Region([Number(ES2region[0]),Number(ES2region[1]),Number(ES2region[2]),Number(ES2region[3])]);
			ES3region = new Region([Number(ES3region[0]),Number(ES3region[1]),Number(ES3region[2]),Number(ES3region[3])]);
			ES4region = new Region([Number(ES4region[0]),Number(ES4region[1]),Number(ES4region[2]),Number(ES4region[3])]);
			ES5region = new Region([Number(ES5region[0]),Number(ES5region[1]),Number(ES5region[2]),Number(ES5region[3])]);
		}
		
		sheet.paintImage( g , getIcon( 'EncounterSet' ) , ESregion ) ;
		sheet.paintImage( g , getIcon( 'EncounterSet1' ) , ES1region ) ;
		sheet.paintImage( g , getIcon( 'EncounterSet2' ) , ES2region ) ;
		sheet.paintImage( g , getIcon( 'EncounterSet3' ) , ES3region ) ;
		sheet.paintImage( g , getIcon( 'EncounterSet4' ) , ES4region ) ;
		sheet.paintImage( g , getIcon( 'EncounterSet5' ) , ES5region ) ;
	case 'Title': writeTextOutlined( 'Name' , Name_writer , strokeMedium , diy , g , sheet ) ;
	case 'Logo':
		if( $GameName != '' ) writeTextOutlined( 'GameName' , GameName_writer , strokeMedium , diy , g , sheet ) ;
		else paintLogo( g , diy , sheet ) ;
	}
	
// TEXTS
	BodyLeft = '';
	BodyLeft =  addTextPart(BodyLeft,'StoryLeft',diy);
	BodyLeft =  addTextPart(BodyLeft,'RulesLeft',diy);
	BodyLeft =  addTextPart(BodyLeft,'FlavourLeft',diy);
	if($('LRL-'+Card+'-justified') == 'yes'){BodyLeft = BodyLeft+'<justified>';}
	BodyLeft_box.markupText = BodyLeft;
	updateNameTags(BodyLeft_box,diy);
	BodyRight = '';
	BodyRight =  addTextPart(BodyRight,'StoryRight',diy);
	BodyRight =  addTextPart(BodyRight,'RulesRight',diy);
	BodyRight =  addTextPart(BodyRight,'FlavourRight',diy);
	if($('LRL-'+Card+'-justified') == 'yes'){BodyRight = BodyRight+'<justified>';}
	BodyRight_box.markupText = BodyRight;
	updateNameTags(BodyRight_box,diy);
	var regionLeft = settingToArray(checkKey('BodyLeft-region'));
	var regionRight = settingToArray(checkKey('BodyRight-region'));
	switch(String($PortraitSize)){
		case 'small':
			regionRight[3] = Number(regionRight[3])-524;
			break;
		case 'medium':
			regionLeft[3] = Number(regionLeft[3])-524;
			regionRight[3] = Number(regionRight[3])-524;
			break;
		default:
	}
	switch(String($Layout)){
		case 'logo':
			regionLeft[1] = Number(regionLeft[1])+280;
			regionLeft[3] = Number(regionLeft[3])-280;
			break;
		case 'title':
			regionLeft[1] = Number(regionLeft[1])+360;
			regionLeft[3] = Number(regionLeft[3])-360;
			break;
		case 'sets':
			regionLeft[1] = Number(regionLeft[1])+416;
			regionLeft[3] = Number(regionLeft[3])-416;
			break;
		default:
	}
	BodyLeft_box.draw(g,new Region(regionLeft));
	BodyRight_box.draw(g,new Region(regionRight));
	
	if(Number($Page)>0){
		Page_tinter.setImage(ImageUtils.get('TheLordOfTheRingsLCG/numbert/'+$Page+'.png'));
		hsb = diy.settings.getTint('Template-tint');
		Template_tinter.setFactors(hsb[0],hsb[1],hsb[2]/2);
		if(isOdd(Number($Page))){
			sheet.paintImage(g,Template_tinter.getTintedImage(),checkKey('campaignColourBR-region'));
			sheet.paintImage(g,
				Page_tinter.getTintedImage(),
				'QuestSheet-Page-odd-region'
			); 
		}else{
			sheet.paintImage(g,Template_tinter.getTintedImage(),checkKey('campaignColourBL-region'));
			sheet.paintImage(g,
				Page_tinter.getTintedImage(),
				'QuestSheet-Page-even-region'
			);
	} 
	}
	if( $PortraitSize != 'none' ){drawArtist(g,diy);}
	drawCopyright(g,diy);
	drawCollectionInfo(g,diy);
/*FINISH*/
	saveLocalized(diy);
}

if( sourcefile == 'Quickscript' ){
	Settings.shared.addSettingsFrom( 'project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/LRL.settings' ) ;
	Settings.shared.addSettingsFrom( 'project:TheLordOfTheRingsLCG-B/resources/TheLordOfTheRingsLCG/LRL-B.settings' ) ;
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
