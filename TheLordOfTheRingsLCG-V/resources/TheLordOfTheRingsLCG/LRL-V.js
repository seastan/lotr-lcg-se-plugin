useLibrary( 'extension' ) ;

const componentList = new Array(
	'Quest'
	, 'Setup'
	, 'Campaign'
	, 'Gift'// pasar a LRL-Unofficial
	, 'Haven'
	, 'Presence'
	, 'Occurrence'
) ;

function getName(){ return @LRL-V ; }
function getDescription(){ return @LRL-V-description ; }
function getVersion(){ return 2.0 ; }

function initialize(){
	if( Game.get('LRL') == null ){
		Eons.log.warning( "TheLordOfTheRingsLCG-V can't find TheLordOfTheRingsLCG" ) ;
	}else{
		for(
			let index = 0 ; 
			index < componentList.length ; 
			index++
		){
			ClassMap.add( 'TheLordOfTheRingsLCG/'+componentList[index]+'/component.classmap' );
		}
	}
}
