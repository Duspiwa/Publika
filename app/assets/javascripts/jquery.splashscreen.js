[sourcecode language=”javascript”]
// A self-executing anonymous function,
// standard technique for developing jQuery plugins.
(function($){
$.fn.splashScreen = function(settings){
// Fournir les options par défaut
settings = $.extend({
textLayers	: [],
textShowTime	: 1500,
textTopOffset	: 80
},settings);
var demoImg = this;

// Création de la div splashscreen.
// Le reste du style est dans la page index.php
var splashScreen = $(‘<div>’,{
id	: ‘splashScreen’,
css:{
backgroundImage	: demoImg.css(‘backgroundImage’),
backgroundPosition	: ‘center ‘+demoImg.offset().top+’px’,
height	: $(document).height()
}
});

$(‘body’).append(splashScreen);

splashScreen.click(function(){
splashScreen.fadeOut(‘slow’);
});

// Liaison d’un événement personnalisé pour modifier le texte actuel visible selon
// le contenu du tableau textLayers (passé en paramètre)
splashScreen.bind(‘changeText’,function(e,newID){
// Si l’image que nous voulons montrer, est
// dans les limites du tableau
if (settings.textLayers[newID]){
showText(newID);
}
else {
splashScreen.click();
}
});

splashScreen.trigger(‘changeText’,0);

// Extraction de la fonctionnalité dans une
// fonction distincte pour plus de commodité.
function showText(id){
var text = $(‘<img>’,{
src:settings.textLayers[id],
css: {
marginTop : demoImg.offset().top+settings.textTopOffset
}
}).hide();

text.load(function(){
text.fadeIn(‘slow’).delay(settings.textShowTime).fadeOut(‘slow’,function(){
text.remove();
splashScreen.trigger(‘changeText’,[id+1]);
});
});
splashScreen.append(text);
}
return this;
}
})(jQuery);
[/sourcecode]