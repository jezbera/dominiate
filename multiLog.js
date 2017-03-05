// Generated by CoffeeScript 1.12.4
(function() {
  var MultiLog,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  MultiLog = (function() {
    function MultiLog(outputElt, paginatorElt) {
      this.outputElt = outputElt;
      this.paginatorElt = paginatorElt;
      this.addLineToEnd = bind(this.addLineToEnd, this);
      this.addLineToCurrent = bind(this.addLineToCurrent, this);
      this.pages = [];
      this.selectPage(1);
    }

    MultiLog.prototype.reset = function() {
      this.pages = [];
      this.selectPage(1);
      this.updateOutput();
      return this.updatePaginator();
    };

    MultiLog.prototype.numPages = function() {
      return this.pages.length;
    };

    MultiLog.prototype.pagesShown = function() {
      var i, maxPage, minPage, results;
      minPage = Math.max(this.currentPage - 4, 1);
      maxPage = Math.min(this.numPages(), minPage + 9);
      minPage = Math.max(1, maxPage - 9);
      if (maxPage < minPage) {
        return [];
      }
      return (function() {
        results = [];
        for (var i = minPage; minPage <= maxPage ? i <= maxPage : i >= maxPage; minPage <= maxPage ? i++ : i--){ results.push(i); }
        return results;
      }).apply(this);
    };

    MultiLog.prototype.getCurrent = function() {
      return this.pages[this.currentPage - 1];
    };

    MultiLog.prototype.getCurrentPage = function() {
      return this.currentPage;
    };

    MultiLog.prototype.getLastPage = function() {
      return this.pages.length;
    };

    MultiLog.prototype.updateOutput = function() {
      if (this.pages[this.currentPage - 1] != null) {
        this.outputElt.html(this.pages[this.currentPage - 1]);
        return window.scrollToBottom(this.outputElt);
      }
    };

    MultiLog.prototype.prevButtonClass = function() {
      if (this.currentPage <= 1) {
        return "prev page disabled";
      } else {
        return "prev page";
      }
    };

    MultiLog.prototype.nextButtonClass = function() {
      if (this.currentPage >= this.numPages()) {
        return "next page disabled";
      } else {
        return "next page";
      }
    };

    MultiLog.prototype.updatePaginator = function() {
      var i, item, items, len, next, oldPages, pageNum, pages, prev;
      pages = this.pagesShown();
      oldPages = this.pagesRendered;
      if ((oldPages != null) && oldPages.length === pages.length && pages[0] === oldPages[0]) {
        if (this.currentPage === this.renderedPage) {
          return;
        }
      }
      prev = "<li class='" + (this.prevButtonClass()) + "'><a href='#'>&larr; Previous</a></li>";
      next = "<li class='" + (this.nextButtonClass()) + "'><a href='#'>Next &rarr;</a></li>";
      items = [prev];
      for (i = 0, len = pages.length; i < len; i++) {
        pageNum = pages[i];
        if (pageNum === this.currentPage) {
          item = "<li class='active page'><a href='#'>" + pageNum + "</a></li>";
        } else {
          item = "<li class='page'><a href='#'>" + pageNum + "</a></li>";
        }
        items.push(item);
      }
      items.push(next);
      this.paginatorElt.html('<ul>' + items.join('') + '</ul>');
      this.updateEvents();
      this.pagesRendered = pages;
      return this.renderedPage = this.currentPage;
    };

    MultiLog.prototype.updateEvents = function() {
      return $('.page').click((function(_this) {
        return function(event) {
          var liText, num;
          if (!$(event.currentTarget).hasClass('disabled')) {
            liText = $(event.currentTarget).text();
            if (liText.match(/Previous/)) {
              _this.selectPage(_this.currentPage - 1);
            } else if (liText.match(/Next/)) {
              _this.selectPage(_this.currentPage + 1);
            } else {
              num = +($(event.currentTarget).text());
              _this.selectPage(num);
            }
          }
          return false;
        };
      })(this));
    };

    MultiLog.prototype.selectPage = function(num) {
      this.currentPage = num;
      this.updateOutput();
      return this.updatePaginator();
    };

    MultiLog.prototype.addPage = function(content) {
      if (this.pages.length >= 100) {
        this.pages = this.pages.slice(50);
      }
      this.pages.push(content);
      this.currentPage = this.numPages();
      this.updateOutput();
      return this.updatePaginator();
    };

    MultiLog.prototype.addPageQuietly = function(content) {
      if (this.pages.length > 100) {
        this.pages = this.pages.slice(50);
        this.updateOutput();
      }
      this.pages.push(content);
      return this.updatePaginator();
    };

    MultiLog.prototype.addLineToCurrent = function(text) {
      var current;
      current = this.getCurrent();
      if (current == null) {
        return;
      }
      this.pages[this.currentPage - 1] += text + '\n';
      return this.outputElt.append(text + '\n');
    };

    MultiLog.prototype.addLineToEnd = function(text) {
      var current;
      current = this.getCurrent();
      if (current == null) {
        return;
      }
      this.pages[this.pages.length - 1] += text + '\n';
      if (this.currentPage === this.pages.length - 1) {
        return this.outputElt.append(text + '\n');
      }
    };

    return MultiLog;

  })();

  this.MultiLog = MultiLog;

}).call(this);
