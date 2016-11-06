#MAXLIMIT

### Description

MAXLIMIT is a javascript library that can retrieve counts or allow you to limit words and characters in HTML form controls.

### Properties

> Control = The form control that will contain the text.

> StopPoint = The numeric limit of characters or words to stop at.

> DisplayType = A enum definition of the capture type.

### Methods

> GetWordCount() = Retreives the word count total.  Note: This ignores spaces and carriage returns.

> GetCharacterCount() = Retreives the character count total.

> Count() = Starts the counting/limiting process.

### Example
----------
**The snippet below shows how to limit words in a textarea and display the count in a span element.**

     <script src="Scripts/jquery-1.10.2.min.js"></script>
     <script src="Scripts/MaxLimit.js"></script>
     <script>
         $(function () {
             var limit = new MaxLimit($('#txtComments'));
             limit.StopPoint = 5;
             limit.Count($("#lblDisplayText"), limit.DISPLAYTYPE.WORD);
         });
     </script>

     <h2>Max Limit Example</h2>

     <form method="post" enctype="multipart/form-data">
          <p>Current word count: <span id="lblDisplayText"></span></p>
          <textarea id="txtComments" name="txtComments"></textarea>
     </form>


###Notes

- Displaying the count in an element is optional.  If you do not want it simply pass a null parameter.
> limit.Count(**null**, limit.DISPLAYTYPE.WORD);

- You can use the DisplayType property to switch between words and characters
> limit.Count($("#lblDisplayText"), **limit.DISPLAYTYPE.CHARACTER**);
