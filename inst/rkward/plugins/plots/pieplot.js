//author: Alfredo Sánchez Alberca (asalber@ceu.es)

var data, variable, variablename, groups, groupsname, relative, fill, facet, freq; 

function preprocess () {
	echo('require(ggplot2)\n');
}

function calculate() {
	variable = getString("variable");
	data = variable.split('[[')[0];
	variablename = getString("variable.shortname");
	// Set grouped mode
	facet = '';
	if (getBoolean("grouped")) {
		groups = getString("groups");
		groupsname = getString("groups.shortname");
			facet = ' + facet_grid(.~' + groupsname + ')';
	}
	freq = "Frecuencia absoluta";
	// Set relative frequencies
	relative = '';
	if (getBoolean("rel_freq")) {
		relative = ', position="fill"';
		freq = "Frecuencia relativa";
	}
    // Filter
	echo(getString("filter_embed.code.calculate"));
}

function printout () {
	doPrintout(true);
}

function preview() {
	preprocess();
	calculate();
	doPrintout(false);
}

function doPrintout(full) {
	// Print header
	if (full) {
		echo ('rk.header ("Diagrama de sectores de ' + variablename + '", list ("Variable" = rk.get.description(' + variable + ')))\n');
		echo ('rk.graph.on()\n');
	}
	// Plot
	echo('try ({\n');
	echo('p<-ggplot(data=' + data + ', aes(x=factor(1), fill=factor(' + variablename + '))) + geom_bar(width=1' + relative + ') +  coord_polar(theta="y") + xlab("' + freq + '") + ylab("") + theme( axis.ticks.y=element_blank(), axis.text.y=element_blank()) + scale_fill_hue("' + variablename + '")' + facet + getString("plotoptions.code.calculate") + '\n');
	echo('print(p)\n');
	echo ('})\n');

	if (full) {
		echo ('rk.graph.off()\n');
	}
}

