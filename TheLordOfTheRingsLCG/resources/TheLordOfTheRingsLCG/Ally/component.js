// Used on libraries to get correct card images, settings, ...
const Card = 'Ally' ; 

// This script's code version
const CardVersion = 1 ;
// 1: rewrite using new 2020 library

// "TemplateList" includes all the template variants
// for this component, except the draft. 
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
) ;

/*
All the plugin code revolves around the concept of the component "settings"
explained in the developer manual. "Settings" (defined in the
code by the $ simbol) store everything the user can define in a component,
like it's title, stats or portraits.
I've created a library that creates user interface controls, drawing methods
and other stuff based on the "setting" name. Basically, three functions are
needed for each editable part on a component: one for user interface control
(it's text or a image?), one for the painter (if it's text, which font
and size?) and another that actually paints it (where and when? to
avoid overlapping other stuff and/or to use a special graphical effect).
For example, card "Type" setting, ($Type), is defined in the user interface
by Type_control, in the createFrontPainter by Type_writer and in the
paintFront by writeLine( 'Type' ).
*/

function create( diy ){
/*
"create" is one of the main functions on scripted components. It's 
called on "New" component creation. It defines the basic 
characteristics of the component, like what plugin it relies on, 
how many sides it has, basic template, portraits, example values... 
*/

/*
Next portion of code defines the plugin the component uses and the 
version of the code. $VersionHistory is used for debugging purposes,
keeping track of the plugin versions used to edit the component.
*/
	diy.extensionName = 'TheLordOfTheRingsLCG.seext' ;
	diy.version = LibraryVersion+CardVersion ;
	$VersionHistory = diy.version ;
	
/*
Next portion of code loads $settings used by the component, specifically, 
regions where images and texts are drawn.
In previous versions of the plugin, these where loaded into the plugin scope.
I modified it to make it easier for the users to customize settings and to
avoid problems with aspect change from loading into newer plugin versions.
*/
	// custom function, to load default settings and texts for the card
	loadSettings( diy ) ;
	loadExample( diy ) ; 

/*
Next portion of code defines the template of the component. 
FaceStyle.PLAIN_BACK defines that only a image is used for the
back of the component.
frontTemplateKey defines the setting used for the main frontal
image of the component. It is not mandatory to draw this image,
and the main purpose is to get the correct component size. In this
plugin, whenever a variable template is required for the same type
of component, an empty image is used to get the size, and then, the 
required template variant is painted.
backTemplateKey defines the setting used for the back
image of the component.
bleedMargin defines the overdrawn template size, that is the size
of the template that will be cut when to get a properly sized component.
It is done to minimize the impact of cutting errors.
*/
	diy.frontTemplateKey = 'Template' ;
	diy.backTemplateKey = 'TemplateBack' ;
//	diy.faceStyle = FaceStyle.PLAIN_BACK ;
	diy.faceStyle = FaceStyle.TWO_FACES ;
	diy.bleedMargin = 9 ;
	
	// I use the custom portrait system because portraits are used in other,
	// component elements, like collection icon or some graphics for custom
	// template variant.
	diy.customPortraitHandling = true ;
	// These are custom functions to create the portrait elements.
	// portraits are the only graphical element that is stored in the
	// component file. Thus, they are handled in a special way. They have to
	// be identified when the component is created so they can be stored and
	// and put back in their place on component file reading.
	createPortrait( 'Portrait' , diy ) ;
	createPortrait( 'Collection' , diy ) ;
	createPortrait( 'CustomSphere' , diy ) ;
	createPortrait( 'BodyIcon' , diy ) ;
	
	// This is used by customPortraitHandling and must be kept
	// I store it in a setting for backwards compatibility use
	$PortraitListCount = getPortraitCount() ;
}

function createInterface( diy , editor , sheet ){
/*
"createInterface" is one of the main functions on scripted components.
It's called only when a component is going to be edited. It fills an
editor tab with user controls, allowing component editing.
I create a tab on the component editor tab for different groups of 
controls. The Main_tab contains the main controls, like card title, 
stats and effect text. The Portrait_tab is used only for Main and 
secondary portrait related controls, like the portrait image selector 
and manipulators and artist naming. The Collection_tab includes 
collection icon, number and additional information, along with any 
other control that may be useful but rarely used, like copyright 
information or card type. The Help_tab is a way of giving to the user 
help on editing without accesing external sources. Also, some game 
specific information is included, like officialy used traits or keywords.
*/

/* 
"Bindings" is the system that initializes user interface control 
values into the settings loaded from a saved component or from plugin 
defaults. It will store them into the component settings too. Each 
control creator includes a method bindings.add. Also note the method 
bindings.bind at the end of CreateInterface.
*/
	var bindings = new Bindings( editor , diy ) ;
	
/*
For the user interface, I group controls depending on what they will
change: one tab for rules related text, another for the template, 
another for portrait, and another for collection related. Each control 
group is available through a editor tab. 
*/

		// "center" is used to place the element in the horizontal center
		// of the row. It's used because the elements in the next row will
		// span a wider space and it will look better.
		
		// "separator()" draws a line in the next row, as wide as possible.
		//separator(), 'newline,growx' 

// RULES TAB
/*
This tab includes the component title, and all the stats and effects.
A few important things (for example, sphere), aren't included here,
but all text is in this tab.
*/
 	// Basically, the tab can be seen as a spreadsheet, and you determine
 	/// what to place (a control, text, whatever) and how.
	var Main_tab = new Grid() ;
	
	// Shows a vertical scrolling control in the tab, if needed 
	Main_tab.editorTabScrolling = true ;
	
		
	let Title_panel = new Grid() ;
	Title_panel.setTitle( @LRL-Title-panel ) ;

	// custom function to define the card title text control. It's linked to
	// diy.nameField that is used in the placement
	uiName( diy , bindings ) ;

	// custom function to define a true/false button shown with an icon
	Unique_control = new uiButtonIcon( 'Unique' , diy , bindings ) ;
	
	// "place" is the method that places controls in the user interface
	// No easier placement is provided because it's totally component
	// dependant. In the next placement, three elements are drawn, all related to
	// component title and decorational separator after them.
	Title_panel.place(

		// "Unique_control" button is drawn sharing the available horizontal
		// space. "split" is not needed because it was used before.
		Unique_control , 'split' ,
		
		// "diy.nameField" control is drawn now, but the "growx" option is
		// used to make the control as wide as possible in the row.
		diy.nameField , 'growx'
		
	) ;
	Main_tab.place( Title_panel , 'newline,growx' ) ;

	let Stats_panel = new Grid() ;
	Stats_panel.setTitle( @LRL-Stats-panel ) ;
	
	// custom funtions to define stats. In this case, stats could include
	// non-numerical options, like and X, so the control is a list. 
	ResourceCost_control = new uiStat( 'ResourceCost' , bindings ) ;
	HitPoints_control = new uiStat( 'HitPoints' , bindings ) ;
	Willpower_control = new uiStat( 'Willpower' , bindings ) ;
	Attack_control = new uiStat( 'Attack' , bindings ) ;
	Defense_control = new uiStat( 'Defense' , bindings ) ;
	
	// In this placement, several "growx" can be found per line.
	// In this case, all those controls will have the same width.
	Stats_panel.place(
		uiIcon( 'ResourceCost' ) , 'split' ,
		ResourceCost_control , 'growx' ,
		uiIcon( 'HitPoints' ) , '' ,
		HitPoints_control , 'growx' ,
		uiIcon( 'Willpower' ) , 'newline,split' ,
		Willpower_control , 'growx' ,
		uiIcon( 'Attack' ) , '' ,
		Attack_control , 'growx' ,
		uiIcon( 'Defense' ) , '' , 
		Defense_control , 'growx' 
	) ;
	Main_tab.place( Stats_panel , 'newline,growx' ) ;
	
	let Effect_panel = new Grid() ;
	Effect_panel.setTitle( @LRL-Effect-panel ) ;
	
	// custom funtion to define short text controls
	Trait_control = new uiText( 'Trait' , bindings ) ;
	
	// custom funtions to define text controls that may span several lines
	Rules_control = new uiParagraph( 'Rules' , bindings ) ;
	Flavour_control = new uiParagraph( 'Flavour' , bindings ) ;
	
	Effect_panel.place(
		// "@LRL-Title" writes a text localized depending on the
		// "User interface language" defined in the Preferences. Placement
		// options are defined simply with "split", used to share the available
		// horizontal space with other controls until "newline" is found.
		// horizontal space is determined by the sum of the minimum space
		// required by any row in the tab.
		
		@LRL-Trait , 'newline,center' , 
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

	// Now everything is actually drawn in the editor
	Main_tab.addToEditor( editor , @LRL-Main-tab ) ;
	
// TEMPLATE TAB
/*
This tab is used for template related options, like the sphere (colour)
the component belongs to. It also includes controls for the creation of
custom spheres, that is, unofficial spheres.
*/
	var Template_tab = new Grid() ;
	Template_tab.editorTabScrolling = true ;
	
	let Template_panel = new Grid() ;
	Template_panel.setTitle( @LRL-Template-panel ) ;
	
	// custom function that shows a selectable icon plus text list control.  
	Template_control = new uiIconList( 'Template' , TemplateList , bindings ) ;
	
	Template_panel.place(
		Template_control , 'growx'
	) ;
	Template_tab.place( Template_panel , 'newline,growx' ) ;
	
	let CustomSphere_panel = new Grid() ;
	CustomSphere_panel.setTitle( @LRL-CustomSphere-panel ) ;
	
	// custom function that shows a portrait control
	CustomSpherePortrait_control = new uiPortrait( 'CustomSphere' , diy ) ;
	
	CustomSphereBodyIconPortrait_control = new uiPortrait( 'BodyIcon' , diy ) ;
	
	// custom function that shows a horizontal slider control for
	// to select the transparency of "BodyIcon".
	CustomSphereBodyIconTransparency_control = new uiTransparency( 'BodyIcon' , bindings ) ;
	
	// custom function that shows a tinter control. It shows a colour
	// selector and a list of predefined colours.
	CustomSphereTint_control = new uiTint( 'CustomSphere' , bindings ) ;
	CustomSphereTint_control.title = @LRL-CustomSphere-uiTint ;
	
	// In this placement text descriptions of the controls aren't added
	// because the descriptions are included in the control creator.
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
	
	// Custom functions to show how the card will look after the cut
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
/*
This tab is used only for the main portrait of the component and the
"Artist" control related to it.
*/
	var Portrait_tab = new Grid() ;
	Portrait_tab.editorTabScrolling = true ;
	
	let Portrait_panel = new Grid() ;
	Portrait_panel.setTitle( @LRL-Portrait-panel ) ;
	
	Portrait_control = new uiPortrait( 'Portrait' , diy ) ;
	
	// Custom function to add a button to mirror a portrait image horizontally
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
/*
This tab is used for the collection icon and information, and also for other
less likely to be used controls. For example, controls to change "Type" and
"Copyright" texts are included here.
*/
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

	// This method links each control to it's respective setting as defined
	// in the creator of each control. Must be included always.
	bindings.bind() ; 
}

function createFrontPainter( diy , sheet ){
/*
"createFrontPainter" is one of the main functions on scripted 
components. It's called only once when a component is going to be 
drawn by the preview or exported to a file. Several 
editable stuff that depends on user controls or graphical effects 
must be defined before actually drawing the component. Further 
drawings will take less time once these elements are defined. Thus, 
text boxes' font format or tintable graphics are prepared beforehand. 
Only stuff used in the front side is defined. There is a "sister" 
function for the back side of the component too: createBackPainter. 
Note that all these "painters" are created as global elements (not 
defined as var or const) so they can be accesed in paintFront.
*/
	
// TEMPLATE
	// Template has several elements that change colour and/or image
	// depending on the custom tint selector.
	CustomSphere_tinter = new createTinter( 'CustomSphere' , diy ) ;

// STATS
	// Several stats are tinted with a fixed colour, and only image (that is, the number) changes.
	ResourceCost_tinter = new createTinter( 'ResourceCost' , diy ) ;
	HitPoints_tinter = new createTinter( 'HitPoints' , diy ) ;

// TEXT
	// Writers define, for a given text element, the basic font properties 
	// (family, size, alignment, colour...) pretty much all it's properties
	// except the region definition (that is position and size within the
	// component). The text itself along with the text position is passed to
	// these writers right before writing the the text.
	// When these properties change, creating a new writes is the most
	// convenient solution. This may result in creating a writer for each text
	// element, but they can also be shared. For example, there are 2 Option
	// text elements (OptionLeft and OptionRight), but text properties are
	// exactly the same, and only the position changes. Bottom_writter is used
	// for each text element within the bottom line (CollectionInfo, Artist,
	// Copyright and CollectionNumber). The only difference in those elements
	// is the horizontal alignment, so an alignment tag is added to the text
	// and passed to them.
	Name_writer = new createTextBox( 'Name' , diy , sheet ) ;
	Body_writer = new createTextBox( 'Body' , diy , sheet ) ;
	Option_writer = new createTextBox( 'Option' , diy , sheet ) ;
	Type_writer = new createTextBox( 'Type' , diy , sheet ) ;
	Bottom_writer = new createTextBox( 'Bottom' , diy , sheet ) ;
	Subtype_writer = new createTextBox( 'Subtype' , diy , sheet ) ;
	
	updateExternalPortrait( 'Portrait' , diy ) ;
	updateExternalPortrait( 'Collection' , diy ) ;
	updateExternalPortrait( 'CustomSphere' , diy ) ;
	updateExternalPortrait( 'BodyIcon' , diy ) ;
}

function createBackPainter( diy, sheet ){ 
/*
"createBackPainter" is one of the main functions on scripted components.
This is functionally identical to createFrontPainter, but is used for 
the back side of the component.
Because
*/
	debug( 1 , 'createBackPainter' ) ;
}

function paintFront( g , diy , sheet ){ 
/*
"paintFront" is one of the main functions on scripted components. It's 
called whenever a component is actually going to be drawn by
preview or exported to a file. There is a "sister" function for 
the back side of the component too: paintBack. 
*/
// PORTRAIT
	paintPortrait( 'Portrait' , g ,  diy ,sheet ) ;

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
	paintStatTinted( 'ResourceCost' , ResourceCost_tinter , g , sheet ) ;
	paintStatTinted( 'HitPoints' , HitPoints_tinter , g , sheet ) ;
	paintStat( 'Willpower' , g , sheet ) ;
	paintStat( 'Attack' , g , sheet ) ;
	paintStat( 'Defense' , g , sheet ) ;

// TEXTS
	writeName( g , diy ) ;
	writeBody( [ 'Trait' , 'Rules' , 'Shadow' , 'Flavour' ] , g , diy ) ;

	writeType( g , diy ) ;
	if( $Template == 'Boon' ) writeSubtype( g , diy ) ;
	writeOptionLeft( g , sheet , diy ) ;
	writeOptionRight( g , sheet , diy ) ;
	
	writeArtist( g , sheet , diy ) ;
	writeCopyright( g , sheet , diy ) ;
	writeCollectionInfo( g , sheet , diy ) ;
	writeCollectionNumber( g , sheet , diy ) ;

	paintCut( g , diy , sheet ) ;
}

function paintBack( g, diy, sheet ){ 
/*
"paintBack" is one of the main functions on scripted components. This 
is functionally identical to paintFront, but is used for the back side
of the component.
*/
	sheet.paintTemplateImage( g ) ;
	paintCut( g , diy , sheet ) ;
}

if( sourcefile == 'Quickscript' ){
/*
"Quickscript" code is used to load the settings, texts and libraries
used while editing the plugin, that is pressing F5 to run the script.
*/
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
