var app = $.sammy('#main', function() {
	var colors = ['#F65B83','#9662ED','#E4D6CD','#C8111D','#D4584C','#B3BEF4','#DAA447','#4D4075','#38D899','#43795F','#33D924','#A207BB','#6578FE']
	function randomColor() {
		return colors[Math.floor(Math.random()*colors.length)]
	}
	this.swap = function(content) {
		this.$element().hide(0).html(content).fadeIn(300);
	}

	this.get('#/me', function(context) {
		$('#project-list').hide('slow');
		var html = $('#me').html();
		this.swap(html);
		$('.highlight').mouseenter(function(){
			$(this).css('background-color', randomColor() )
		}).mouseleave(function(){
			$(this).css('background-color', '#ddd')			
		})
	});
	
	this.get('#/contact', function(context) {
		$('#project-list').hide('slow');
		var html = $('#contact').html();
		this.swap(html);
	});
	
	this.get('#/resume', function(context) {
		$('#project-list').hide('slow');
		var html = $('#resume').html();
		this.swap(html);
	});
	
	this.get('#/projects', function(context) {
		var html = $('#projects').html(), content, categories = [], newCategories, $checkboxContainer;
		$('#project-list').show('slow');
		this.swap(html);
		/*
		$checkboxContainer = $('.checkbox-container').html('');;*/
		content = this.$element().find('.content');
		var count=0
		$('#data-hidden > .project').each(function(){
			count++;
			var $this = $(this),
			title = $this.attr('title');
			/*,
			newCategories = $this.attr('category').split(' '),
			$checkbox;
			
			
			var i = newCategories.length;
			while (i>0) {
				tempCat = newCategories[i-1];
				if (categories.indexOf(tempCat)==-1){
					categories.push(tempCat);					
					$checkboxContainer.append('<div id="'+tempCat+'-checkbox" class="checkbox checkbox-enabled">'+tempCat+'</div>');
					console.log();
					var checkBox = new Checkbox(tempCat+'-checkbox');
				}
				i--
			}	*/
			
			image = $this.find('.first-image').eq(0).attr('src');
				content.append('<a href="#/projects/' + escape(title) + '">'+
				'<div class="feature-container '+$this.attr('category')+'" style="opacity:0; background:#'+Math.floor(Math.random()*16777215).toString(16)+' no-repeat;">' +
				'<div class="feature-title">'+title+'</div>' + 
				'<div class="feature-image" style="background:url(\''+image+'\') no-repeat;"></div>' +
				'</div></a>')
		})
		var tt=1000;
		var timeArray =[]
		for (var i=0; i<=count;i++){
			timeArray.push(tt*i/count)
		}
		$('.feature-container').each(function(){
			
			var $this = $(this),
			timeIn = Math.floor(Math.random()*timeArray.length),
			time = timeArray.slice(timeIn,timeIn+1);
			console.log(time);
			setTimeout(function(){
					$this.css('opacity','1');
			},time)
		});
	});
	
	this.get('#/projects/:title', function(context) {
		var title = unescape(this.params['title']).replace(' ',"");
		$('#project-list').show('slow');
		html = '<div class="title">' + this.params['title'] + '</div>' + $('#' + title).html();
		console.log(html);
		this.swap(html);
	});
	
	this.notFound('get','#/me');
});

$(document).ready(function() {
	$('#data-hidden').load('templates/templates.html', function () {
				
		$('#project-list').html('');
		$('#data-hidden > .project').each(function(){
			var title = $(this).attr('title');
			$('#project-list').append('<li><a href="#/projects/' + escape(title) + '">' + title +'</a></li>');
		})
		app.run('#/me');
	});
	
});

function Checkbox (id) {
	self = this;
	self.$div = $('#'+id);;
	self.enabled = true;
	self.toggle = function ($div) {
			console.log($div.parent().parent().children('.content').find('a>div'));
			$div.parent().parent().children('.content').find('a>div').filter('.'+$div.text()).toggle();
			self.enabled
			self.enabled = (self.enabled) ? false:true;
			$div.toggleClass('checkbox-enabled')
	}
	self.$div.click(function() {
		self.toggle($(this));
	});
	
	return self;
}

