/*
* Objective: To create a flexible tool that helps track character or word counts and helps
*            stop input if over the defined amount.
* Original Author: Joseph Anger
* Date Created: 11/05/2016
*/
var MaxLimit = function (obj) {

    this.Control = obj;
    this.CharacterCount = 0;
    this.WordCount = 0;
    this.StopPoint = 0;
    this.DISPLAYTYPE = {
        CHARACTER: { value: 0 },
        WORD: { value: 1 },
    };

    //function to get the current character count
    MaxLimit.prototype.GetCharacterCount = function () {
        this.CharacterCount = obj.val().length;
        return obj.val().length;
    }

    //function to get the current word count
    MaxLimit.prototype.GetWordCount = function () {
        var wcount = [];
        var realcount = [];

        if (obj.val().length > 0) {
            wcount = obj.val().replace(/\s+/, " ").split(/\s+|\n/);
        }

        for (var i = 0; i < wcount.length; i++) {
            if (wcount[i] != "")
                realcount.push(wcount[i]);
        }

        this.WordCount = realcount.length;
        return realcount.length;
    }

    //Live counting function
    MaxLimit.prototype.Count = function (displayObj, displayType) {
        obj.keyup({ wc: this }, function (e) {

            var stp = e.data.wc.StopPoint;

            if (stp > 0) {

                //If set to count words
                if (displayType.value == 1) {

                    //get word count
                    var currentCount = e.data.wc.GetWordCount();

                    if (currentCount > stp) {

                        //chop the string if too big
                        var str = e.data.wc.Control.val();
                        var parts = str.split(' ');

                        var value = "";

                        for (var i = 0; i < parts.length - 1; i++) {
                            if (i < stp) {
                                if (i == 0)
                                    value = parts[i];
                                else
                                    value += " " + parts[i];
                            }
                        }

                        e.data.wc.Control.val(value);

                        //then set character count
                        e.data.wc.Control.attr("maxlength", e.data.wc.GetCharacterCount());
                    }
                    else
                        e.data.wc.Control.removeAttr('maxlength');
                }
                //else if set to count characters
                else if (displayType.value == 0) {

                    //get the character count
                    var currentCount = e.data.wc.GetCharacterCount();

                    //set stop point
                    if (currentCount >= stp)
                        e.data.wc.Control.attr("maxlength", e.data.wc.GetCharacterCount());
                    else
                        e.data.wc.Control.removeAttr('maxlength');
                }
            }

            //count
            e.data.wc.CharacterCount = e.data.wc.GetCharacterCount();
            e.data.wc.WordCount = e.data.wc.GetWordCount();

            //display
            if (displayObj != undefined) {
                if (displayType.value == 0)
                    displayObj.html(e.data.wc.CharacterCount);
                else if (displayType.value == 1)
                    displayObj.html(e.data.wc.WordCount);
                else if (displayType == undefined)
                    displayObj.html(e.data.wc.WordCount);
            }
        });
    }
}
