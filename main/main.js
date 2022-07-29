window.addEventListener('load', function (e) {
    function combinations(array, n) {
        // Just wanted to give a credit
        // this part was shamefully stolen from https://stackoverflow.com/users/2700898/matt
        // from his response here https://stackoverflow.com/questions/21640437/return-all-possible-combinations-of-numbers-in-an-array-whose-sum-is-less-than-o/21640668#21640668
        var lists = [], M = 1 << array.length;
        for (var i = 1; i < M; ++i) {
            var sublist = array.filter(function (c, k) { return i >> k & 1 });
            if (sublist.reduce(function (p, c) { return p + c }, 0) <= n)
                lists.push(sublist);
        }
        ///////////////////////////////////////////////////////////////////////////

        var del = [0, null];
        var newList = [];
        for (var j = 0; j < lists.length; j++) {
            newList[j] = lists[j].reduce((a, v) => a + v, 0);
            if (del[0] <= newList[j]) {
                del[0] = Math.floor(newList[j]);
                del[1] = lists[j];
            }
        }
        return del;
    }

    // target sum
    var targetvalue = 0;

    // init button listeners
    const targetvalueBtn = this.document.getElementById('target-value');
    const calculateBtn = this.document.getElementById('calculate');

    targetvalueBtn.addEventListener('input', function (e) {
        targetvalue = e.target.value;
    });
    calculateBtn.addEventListener('click', function (e) {
        var arr = Array.from(window.document.getElementsByClassName('value-input'))
            .filter(el => el.value)
            .map(el => +el.value);
        var res = combinations(arr, targetvalue);
        window.document.querySelector('#result').children[0].innerText = "MAX possible value= "+String(res[0]);
        window.document.querySelector('#result').children[1].innerText = "Values= " + String(res[1]);
    });

});