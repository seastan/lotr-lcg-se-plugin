/* COMPONENT CONFIGURATION */
const Card = 'Set';
const CardVersion = 1 ;
// 1: rewrite using new 2020 library

const TemplateList = new Array(
	'Standard'
	, 'CustomColour'
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
	$PortraitListCount = getPortraitCount() ;
}

function createInterface( diy, editor, sheet ){
/* PORTRAIT */
	Portrait_panel = new portraitPanel(diy,PORTRAIT,@LRL-Portrait);
/* TEMPLATE */
/* ICONS */
	Collection_list = new comboBox(GO.CollectionCombo,null);
	Collection_panel = new portraitPanel(diy,COLLECTION,@LRL-Collection+': '+@LRL-custom);
	EncounterSet_list = new comboBox(GO.EncounterSetCombo,null);
	EncounterSet_portrait = new portraitPanel(diy,ENCOUNTERSET,@LRL-EncounterSet+': '+@LRL-custom);
/* TEXT */
	diy.nameField = new textField($Name,12,null);
	Story_text = new textArea($Story,6,50,true);
	Rules_text = new textArea($Rules,10,50,true);
	Flavour_text = new textArea($Flavour,6,50,true);
	Type_text = new textField($Type,12,null);
	Artist_text = new textField($Artist,12,null);
	Copyright_text = new textField($Copyright,12,null);
	CollectionInfo_text = new textField($CollectionInfo,12,null);
	StoryBack_text = new textArea($StoryBack,6,50,true);
	RulesBack_text = new textArea($RulesBack,10,50,true);
	FlavourBack_text = new textArea($FlavourBack,6,50,true);
	var RulesFrontTab = new Grid(); 
	RulesFrontTab.editorTabScrolling = true;
	RulesFrontTab.place(
		separator(),'newline,growx',
		@LRL-Name,'newline,split',diy.nameField,'growx',
		separator(),'newline,growx',
		@LRL-Story,'newline,center',Story_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Rules,'newline,center,split',new tipButton(@LRL-Rules-tip),'',Rules_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Flavour,'newline,center',Flavour_text,'newline,growx',
		separator(),'newline,growx'
	);
	RulesFrontTab.addToEditor(editor,@LRL-Rules+': '+@LRL-front);
	var RulesBackTab = new Grid(); 
	RulesBackTab.editorTabScrolling = true;
	RulesBackTab.place(
		separator(),'newline,growx',
		@LRL-Story,'newline,center',StoryBack_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Rules,'newline,center,split',new tipButton(@LRL-Rules-tip),'',RulesBack_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Flavour,'newline,center',FlavourBack_text,'newline,growx',
		separator(),'newline,growx'
	);
	RulesBackTab.addToEditor(editor,@LRL-Rules+': '+@LRL-back);
	var PortraitTab = new Grid(); 
	PortraitTab.editorTabScrolling = true;
	PortraitTab.place(
		separator(),'newline,growx',
		Portrait_panel,'newline,growx',
		@LRL-Artist,'newline,split',Artist_text,'growx',
		PortraitMirrorButton(),'split',
		separator(),'newline,growx'
	);
	PortraitTab.addToEditor(editor,@LRL-Portrait);
	var EncounterSetTab = new Grid(); 
	EncounterSetTab.editorTabScrolling = true;
	EncounterSetTab.place(
		separator(),'newline,growx',
		@LRL-EncounterSet,'newline,split',EncounterSet_list,'growx',
		EncounterSet_portrait,'newline,growx',
		separator(),'newline,growx'
	);
	EncounterSetTab.addToEditor(editor,@LRL-EncounterSet);
	var CollectionTab = new Grid(); 
	CollectionTab.editorTabScrolling = true;
	CollectionTab.place(
		separator(),'newline,growx',
		@LRL-Collection,'newline,split',Collection_list,'growx',
		Collection_panel,'newline',
		@LRL-CollectionInfo,'newline,split',CollectionInfo_text,'growx',
		separator(),'newline,growx',
		@LRL-Copyright,'newline,split',Copyright_text,'growx',
		separator(),'newline,growx',
		@LRL-Type,'newline,split',new tipButton(@LRL-Type-tip),'split',Type_text,'growx,split',
		separator(),'newline,growx'
	);
	CollectionTab.addToEditor(editor,@LRL-Collection);
	var bindings = new Bindings(editor,diy);
	bindings.add('Name',diy.nameField,[0]);
	bindings.add('Story',Story_text,[0]);
	bindings.add('Rules',Rules_text,[0]);
	bindings.add('Flavour',Flavour_text,[0]);
	bindings.add('Type',Type_text,[0]);
	bindings.add('Artist',Artist_text,[0]);
	bindings.add('Copyright',Copyright_text,[0]);
	bindings.add('CollectionInfo',CollectionInfo_text,[0]);
	bindings.add('Collection',Collection_list,[0]);
	bindings.add('StoryBack',StoryBack_text,[1]);
	bindings.add('RulesBack',RulesBack_text,[1]);
	bindings.add('FlavourBack',FlavourBack_text,[1]);
	bindings.add('EncounterSet',EncounterSet_list,[1]);
	bindings.bind();
}
function createFrontPainter( diy, sheet ){
	Name_box = markupBox(sheet);
	Name_box.defaultStyle = diy.settings.getTextStyle(checkKey('Name-style'),null);
	Name_box.alignment = diy.settings.getTextAlignment(checkKey('Name-alignment'));
	Type_box = markupBox(sheet);
	Type_box.defaultStyle = diy.settings.getTextStyle(checkKey('Type-style'),null);
	Type_box.alignment = diy.settings.getTextAlignment(checkKey('Type-alignment'));
	Artist_box = markupBox(sheet);
	Artist_box.defaultStyle = diy.settings.getTextStyle(checkKey('Artist-style'),null);
	Artist_box.alignment = diy.settings.getTextAlignment(checkKey('Artist-alignment'));
	Copyright_box = markupBox(sheet);
	Copyright_box.defaultStyle = diy.settings.getTextStyle(checkKey('Copyright-style'),null);
	Copyright_box.alignment = diy.settings.getTextAlignment(checkKey('Copyright-alignment'));
	CollectionInfo_box = markupBox(sheet);
	CollectionInfo_box.defaultStyle = diy.settings.getTextStyle(checkKey('CollectionInfo-style'),null);
	CollectionInfo_box.alignment = diy.settings.getTextAlignment(checkKey('CollectionInfo-alignment'));
	Body_box = markupBox(sheet);
	Body_box.defaultStyle = diy.settings.getTextStyle(checkKey('Body','-style'),null);
	Body_box.alignment = diy.settings.getTextAlignment(checkKey('Body','-alignment'));
	Body_box.setLineTightness($Body-tightness);
	for( let index = 0; index < GO.TagList.length; index++ ){
		let item = GO.TagList[index];
		Body_box.setReplacementForTag($(item+'-tag'),$(item+'-tag-replacement'));
	}
	for( let index = 0; index < GO.StyleList.length; index++ ){
		let item = GO.StyleList[index];
		Body_box.setStyleForTag($(item+'-tag'),diy.settings.getTextStyle(item+'-style',null));
	}
}
function createBackPainter( diy, sheet ){
	BodyBack_box = markupBox(sheet);
	BodyBack_box.defaultStyle = diy.settings.getTextStyle(checkKey('Body','-style'),null);
	BodyBack_box.alignment = diy.settings.getTextAlignment(checkKey('Body','-alignment'));
	BodyBack_box.setLineTightness($Body-tightness);
	for( let index = 0; index < GO.TagList.length; index++ ){
		let item = GO.TagList[index];
		BodyBack_box.setReplacementForTag($(item+'-tag'),$(item+'-tag-replacement'));
	}
	for( let index = 0; index < GO.StyleList.length; index++ ){
		let item = GO.StyleList[index];
		BodyBack_box.setStyleForTag($(item+'-tag'),diy.settings.getTextStyle(item+'-style',null));
	}
}
function paintFront( g, diy, sheet ){
/* PORTRAIT */
	PortraitList[PORTRAIT].paint(g,sheet.getRenderTarget());
/* TEMPLATE */
	sheet.paintTemplateImage(g);
/* ICONS */
	paintIcon(COLLECTION,g,sheet);
	paintIcon(ENCOUNTERSET,g,sheet);
/* TEXT */
	drawName(g,diy);
	drawBody(new Array('Story','Rules','Flavour'),g,diy);
	drawType(g,diy);
	drawArtist(g,diy);
	drawCopyright(g,diy);
	drawCollectionInfo(g,diy);
/*FINISH*/
	saveLocalized(diy);
}
function paintBack( g, diy, sheet ){
/* TEMPLATE */
	sheet.paintTemplateImage(g);
/* TEXT */
	drawBodyBack(new Array('StoryBack','RulesBack','FlavourBack'),g,diy);
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
