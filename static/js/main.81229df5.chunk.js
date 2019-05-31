(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(7),o=a.n(l),s=(a(14),a(1)),u=a(2),m=a(4),i=a(3),c=a(5),p=function(e){function t(){return Object(s.a)(this,t),Object(m.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-dark bg-dark"},r.a.createElement("div",{className:"container-fluid"},r.a.createElement("span",{className:"navbar-brand mb-0 h1"},"Loan Calculator")))}}]),t}(r.a.Component),h=function(){function e(t){var a=this,n=t.loan_amounts,r=t.loan_rates,l=t.down_payment,o=t.minimum_payment,u=t.loan_term,m=void 0===u?120:u;Object(s.a)(this,e),this.loan_amounts=n.map(function(e){return a.toCent(e)}),this.loan_rates=r.map(function(e){return e/100/12}),this.down_payment=this.toCent(l),this.minimum_payment=this.toCent(o),this.loan_term=Math.max(1,Math.ceil(m))}return Object(u.a)(e,[{key:"toCent",value:function(e){return Math.ceil(100*e)}},{key:"sum",value:function(e){return e.reduce(function(e,t){return e+t},0)}},{key:"getTargetLoan",value:function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.loan_amounts,t=-1,a=0;a<e.length;a++)e[a]<=0||(-1===t?t=a:this.loan_rates[a]>this.loan_rates[t]&&(t=a));return t}},{key:"pay_minimum",value:function(e,t){for(var a=0;a<e.length;a++)e[a]-=this.minimum_payment,t-=this.minimum_payment,e[a]<0&&(t+=-e[a],e[a]=0);return{postMinimum:e,remainingPayment:t}}},{key:"step",value:function(e,t){var a=this,n=this.pay_minimum(e.slice(),t),r=n.postMinimum,l=n.remainingPayment;return this.make_payment(r,l).map(function(t,n){return t<=0?t:Math.ceil(t+e[n]*a.loan_rates[n])})}},{key:"make_payment",value:function(e,t){var a=this.getTargetLoan(e);for(-1===a&&(a=0);-1!==a&&t>0;){e[a]-=t,t=0;var n=this.getTargetLoan(e);if(!(e[a]<0&&-1!==n))break;t=-e[a],e[a]=0,a=n}return e}},{key:"run_payment_plan",value:function(e){var t=this.make_payment(this.loan_amounts.slice(),this.down_payment),a=0;if(this.sum(t)<=0)return{amount:this.sum(t),months:a};for(a=1;a<=this.loan_term&&(t=this.step(t,e),!(this.sum(t)<=0));a++);return{amount:this.sum(t),months:a}}},{key:"find_payment_plan",value:function(){var e=this.sum(this.loan_amounts)-this.down_payment,t=Math.floor(e/this.loan_term),a=this.loan_amounts.filter(function(e){return e>0}),n=this.minimum_payment*a.length;if(t<n&&(t=n),this.run_payment_plan(t).amount<=0)return t;for(var r=1e5;r>.1;){for(;this.run_payment_plan(t+r).amount>0;)t+=r;r/=10}return r*=10,Math.floor(t+r)}},{key:"calc_monthly_payment",value:function(){var e=this.find_payment_plan(),t=this.run_payment_plan(e),a=t.amount;return{monthly_payment:e/100,total_payment:(t.months*e+a)/100}}},{key:"run",value:function(){var e=(this.sum(this.loan_amounts)-this.down_payment)/100,t=this.calc_monthly_payment(),a=t.monthly_payment,n=t.total_payment;return a>n&&(a=n),{monthly_payment:a,total_principal:e,total_interest:n-e,total_payment:n}}}]),e}(),d=function(e){function t(){return Object(s.a)(this,t),Object(m.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props,t=e.loan_amount,a=void 0===t?"":t,n=e.loan_rate,l=void 0===n?"":n,o=e.updateLoanAmount,s=e.updateLoanRate;return r.a.createElement("div",{className:"form-group row"},r.a.createElement("div",{className:"input-group col col-12 col-md-6"},r.a.createElement("div",{className:"input-group-prepend"},r.a.createElement("span",{className:"input-group-text"},"$")),r.a.createElement("input",{type:"number",step:".01",className:"form-control",placeholder:"0",value:a,onChange:function(e){return o(e.currentTarget.value)}})),r.a.createElement("div",{className:"input-group col col-12 col-md-6"},r.a.createElement("input",{type:"number",step:".01",className:"form-control",placeholder:"0",value:l,onChange:function(e){return s(e.currentTarget.value)}}),r.a.createElement("div",{className:"input-group-append"},r.a.createElement("span",{className:"input-group-text"},"%"))))}}]),t}(r.a.Component),v=function(e){function t(){return Object(s.a)(this,t),Object(m.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(u.a)(t,[{key:"updateLoanRate",value:function(e,t){t=""===t?void 0:parseFloat(t),this.props.loan_rates[e]=t,this.props.setLoanRate(this.props.loan_rates)}},{key:"updateLoanAmount",value:function(e,t){t=""===t?void 0:this.props.parseDollar(t),this.props.loan_amounts[e]=t,this.props.setLoanAmount(this.props.loan_amounts)}},{key:"buildLoans",value:function(){var e=this,t=this.props,a=t.loan_amounts,n=t.loan_rates;return a.map(function(t,a){return e.buildLoan(t,n[a],a)})}},{key:"buildLoan",value:function(e,t,a){var n=this;return r.a.createElement("li",{className:"list-group-item",key:a},r.a.createElement(d,{loan_amount:e,loan_rate:t,updateLoanAmount:function(e){return n.updateLoanAmount(a,e)},updateLoanRate:function(e){return n.updateLoanRate(a,e)}}))}},{key:"add",value:function(){var e=this.props,t=e.loan_amounts,a=e.loan_rates;t.push(void 0),a.push(void 0),this.props.setLoanAmount(t),this.props.setLoanRate(a)}},{key:"delete",value:function(){var e=this.props,t=e.loan_amounts,a=e.loan_rates;if(1===t.length)return this.clear();this.props.setLoanAmount(t.slice(0,-1)),this.props.setLoanRate(a.slice(0,-1))}},{key:"clear",value:function(){this.props.setLoanAmount([void 0]),this.props.setLoanRate([void 0])}},{key:"render",value:function(){var e=this;return r.a.createElement("ul",{className:"list-group mb-3"},r.a.createElement("li",{className:"list-group-item"},r.a.createElement("div",{className:"row text-center mb-3"},r.a.createElement("h5",{className:"col"},"Loan Balance and Interest Rate")),r.a.createElement("div",{className:"row"},r.a.createElement("button",{type:"button",className:"col btn btn-outline-dark",onClick:function(){return e.add()}},"Add"),r.a.createElement("button",{type:"button",className:"col btn btn-outline-dark",onClick:function(){return e.delete()}},"Delete"),r.a.createElement("button",{type:"button",className:"col btn btn-outline-dark",onClick:function(){return e.clear()}},"Clear"))),this.buildLoans())}}]),t}(r.a.Component),y=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(m.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(r)))).defaultDownPayment=0,a.defaultMinimumPayment=50,a.defaultLoanTerm=120,a.state={loan_amounts:[void 0],loan_rates:[void 0],down_payment:void 0,minimum_payment:void 0,loan_term:void 0},a}return Object(c.a)(t,e),Object(u.a)(t,[{key:"parseDollar",value:function(e){return""===e?void 0:Math.floor(100*parseFloat(e))/100}},{key:"setLoanTerm",value:function(e){e=""===e?void 0:parseInt(e),this.setState({loan_term:e})}},{key:"calculate",value:function(e){var t=this;e.preventDefault();var a=this.state,n=a.loan_amounts,r=a.loan_rates,l=a.down_payment,o=void 0===l?this.defaultDownPayment:l,s=a.minimum_payment,u=void 0===s?this.defaultMinimumPayment:s,m=a.loan_term,i=void 0===m?this.defaultLoanTerm:m,c=new h({loan_amounts:n.map(function(){return arguments.length>0&&void 0!==arguments[0]?arguments[0]:0}),loan_rates:r.map(function(){return arguments.length>0&&void 0!==arguments[0]?arguments[0]:0}),down_payment:o,minimum_payment:u,loan_term:i});Promise.resolve().then(function(){t.props.displayResults(c.run())})}},{key:"body",value:function(){var e=this,t=this.state,a=t.loan_amounts,n=t.loan_rates,l=t.down_payment,o=void 0===l?"":l,s=t.minimum_payment,u=void 0===s?"":s,m=t.loan_term,i=void 0===m?"":m;return r.a.createElement(r.a.Fragment,null,r.a.createElement(v,{loan_amounts:a,loan_rates:n,parseDollar:this.parseDollar,setLoanRate:function(t){return e.setState({loan_rates:t})},setLoanAmount:function(t){return e.setState({loan_amounts:t})}}),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Down Payment"),r.a.createElement("div",{className:"input-group mb-3 col-xl-8 col-lg-10"},r.a.createElement("div",{className:"input-group-prepend"},r.a.createElement("span",{className:"input-group-text"},"$")),r.a.createElement("input",{type:"number",step:".01",className:"form-control",placeholder:this.defaultDownPayment,value:o,onChange:function(t){var a=t.currentTarget.value;return e.setState({down_payment:e.parseDollar(a)})}}))),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Minimum Monthly Payment"),r.a.createElement("div",{className:"input-group mb-3 col-xl-8 col-lg-10"},r.a.createElement("div",{className:"input-group-prepend"},r.a.createElement("span",{className:"input-group-text"},"$")),r.a.createElement("input",{type:"number",step:".01",className:"form-control",placeholder:this.defaultMinimumPayment,value:u,onChange:function(t){var a=t.currentTarget.value;return e.setState({minimum_payment:e.parseDollar(a)})}}))),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Loan Term (Months)"),r.a.createElement("div",{className:"input-group mb-3 col-xl-8 col-lg-10"},r.a.createElement("div",{className:"input-group-prepend"},r.a.createElement("span",{className:"input-group-text"},"$")),r.a.createElement("input",{type:"number",step:"1",className:"form-control",placeholder:this.defaultLoanTerm,value:i,onChange:function(t){var a=t.currentTarget.value;return e.setLoanTerm(a)}}))))}},{key:"render",value:function(){var e=this;return r.a.createElement("form",{onSubmit:function(t){return e.calculate(t)}},r.a.createElement("div",{className:"card-header"},r.a.createElement("h3",null,"Inputs")),r.a.createElement("div",{className:"card-body text-left"},this.body()),r.a.createElement("div",{className:"card-footer"},r.a.createElement("button",{type:"submit",className:"btn btn-outline-primary"},"Calculate")))}}]),t}(r.a.Component),f=function(e){function t(){return Object(s.a)(this,t),Object(m.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(u.a)(t,[{key:"renderResults",value:function(){var e=this.props.results,t=e.monthly_payment,a=void 0===t?0:t,n=e.total_principal,l=void 0===n?0:n,o=e.total_interest,s=void 0===o?0:o,u=e.total_payment,m=void 0===u?0:u,i=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"});return r.a.createElement(r.a.Fragment,null,r.a.createElement("ul",{className:"list-group"},r.a.createElement("li",{className:"list-group-item"},r.a.createElement("ul",{className:"list-group list-group-flush"},r.a.createElement("li",{className:"list-group-item"},r.a.createElement("p",{className:"h4"},"Total Payment"),r.a.createElement("p",{className:"h7"},i.format(m))),r.a.createElement("li",{className:"list-group-item"},r.a.createElement("p",{className:"h4"},"Monthly Payment"),r.a.createElement("p",{className:"h7"},i.format(a))))),r.a.createElement("li",{className:"list-group-item"},r.a.createElement("table",{className:"table"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",{scope:"col"},"Total Principal"),r.a.createElement("th",{scope:"col"},"Total Interest"))),r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("p",{className:"h7"},i.format(l))),r.a.createElement("td",null,r.a.createElement("p",{className:"h7"},i.format(s)))))))))}},{key:"renderBlank",value:function(){return r.a.createElement(r.a.Fragment,null,"Input values and press calculate!")}},{key:"render",value:function(){var e,t=this;return e=void 0===this.props.results?this.renderBlank():this.renderResults(),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"card-header"},r.a.createElement("h3",null,"Results")),r.a.createElement("div",{className:"card-body"},e),r.a.createElement("div",{className:"card-footer"},r.a.createElement("button",{onClick:function(){return t.props.clearResults()},className:"btn btn-outline-primary"},"Clear")))}}]),t}(r.a.Component),_=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(m.a)(this,Object(i.a)(t).call(this,e))).state={results:void 0},a}return Object(c.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"container text-center"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-12 col-lg-6"},r.a.createElement("div",{className:"card"},r.a.createElement(y,{displayResults:function(t){return e.setState({results:t})}}))),r.a.createElement("div",{className:"col-12 col-lg-6"},r.a.createElement("div",{className:"card"},r.a.createElement(f,{results:this.state.results,clearResults:function(){return e.setState({results:void 0})}})))))}}]),t}(r.a.Component),b=function(e){function t(){return Object(s.a)(this,t),Object(m.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(p,null),r.a.createElement(_,null))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(b,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},8:function(e,t,a){e.exports=a(15)}},[[8,1,2]]]);
//# sourceMappingURL=main.81229df5.chunk.js.map