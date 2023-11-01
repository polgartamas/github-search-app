Frontend Take-Home Test:
The goal of this use case is to develop an applica3on that can be used to search GitHub repositories through its open API. Please take a close look at the interac3ve mockup demonstra3ng the basic func3onality: Figma Mockup Link
To become familiar with the API, please refer to the following links:
hEps://developer.github.com/v3/search/ hEps://help.github.com/en/ar3cles/searching-for-repositories hEps://developer.github.com/v3/guides/traversing-with-pagina3on/
The mockup includes features that are not required. Please consult the descrip3on below to discern mandatory features for an acceptable solu3on.
Technical Requirements: Please use the latest version of React to create the app and employ some form of state management library in conjunc3on with it. Apart from these, you are free to choose any libraries or frameworks that you believe are best suited for the problem. You should use latest typescript if you are familier with it.
Mandatory Func7onal Requirements: The prototype is not a design specifica3on, so you have flexibility to design your own layout as long as all the elements with the demonstrated func3onality are present in your solu3on in the same loca3on as on the mockup. Note that some requirements are not shown on the mockup, but you are free to implement them as you see fit.

1. The applica3on should feature a top bar with two menu items. The ac3ve item should always be highlighted in some manner (e.g., underlined). These elements are s3cky and should remain at the top of the screen.
2. In simple search mode, the "Search by" field is mandatory. If leW empty or contains fewer than 3 characters, it should display a valida3on error and prevent the execu3on of the search. Among the three checkboxes next to it, one must always be selected, but there is no upper limit.
3. While execu3ng a search, the app should display a loading indicator.
4. If the search request fails, the app should show an error message.
5. The "Reset" buEon should clear all search fields and remove any displayed results.
6. The search result list should display the first 10 results of the executed search, where:
   • The "Repo full name" should be a link opening the GitHub page of the repository in a new tab.
   • The "Sort by" and "Order by" fields should trigger a new search with all the previous filtering op3ons, along with the changed sort/order value.
   • The user icon should be the avatar of the repository owner and should link to the owner's URL.
   • Display all search results and add pagina3on to the list. You can determine the number of items per page, and the pagina3on can be implemented either client-side or server-side (reques3ng only one page at a 3me) based on your decision.
7. Implemen3ng the history page: The history page should list previous searches, displaying them on the leW side and showing the results of the currently selected search on the right. A search entry should show the query string and all selected filter op3ons. This page should not make any new backend requests to provide this func3onality. If you choose server-side pagina3on for the search results, this page should only display the ini3ally received page.
8. The width of the query list should be resizable by dragging.
9. Mobile view is not within the scope of this project, so please do not work on it.
   AWer comple3ng the solu3on, please upload the code to a private GitHub repository. We would appreciate it if you could show progress in the Git history instead of commieng the en3re solu3on at the end.
