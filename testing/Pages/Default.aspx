<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
  <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
  <script type="text/javascript" src="../Scripts/jquery-1.9.1.js"></script>
  <script type="text/javascript" src="../Scripts/pdfmake.min.js"></script>
  <script type="text/javascript" src="../Scripts/vfs_fonts.js"></script>
  <SharePoint:ScriptLink Name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
  <meta name="WebPartPageExpansion" content="full" />

  <!-- Add your CSS styles to the following file -->

  <link rel="Stylesheet" type="text/css" href="../Content/bootstrap.min.css" />
  <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
  <!-- Add your JavaScript to the following file -->
  <script type="text/javascript" src="../Scripts/App.js"></script>
</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
  Employee FERPA Agreement
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
  <div class="container" id="mainForm" style="display: none">
    <br />
    <br />

    <div class="row">
      <label class="control-label big-bold-text col-lg-2 col-md-4 col-sm-6" style="resize: horizontal">Employee Full Name: </label>
      <div class="col-lg-2 col-md-4 col-sm-6">
        <input id="fullName" class="form-control input-md" style="font-size: 20px; min-width: 100px; width: 100%" onkeypress="this.style.width = ((this.value.length + 1) * 10) + 'px';" />
      </div>

    </div>
    <div class="row">
      <label class="control-label big-bold-text col-lg-2 col-md-4 col-sm-6">Employee Net ID: </label>

      <label id="netID" class="control-label col-lg-2 col-md-4 col-sm-6" style="font-size: 20px; font-weight: 400" />
    </div>
    <div class="row">
      <div class="col-lg-2 col-md-4 col-sm-6"></div>
      <p class="col-lg-4" style="font-size: 11px">* If this is not your Net ID, please return to the page that brought you here, logout, and try again.</p>
    </div>
    <div class="row">
      <label class="control-label big-bold-text col-lg-4 col-md-8 col-sm-12">
        Department: School of Technology</label>
      <br />
    </div>
    <div class="row">
      <label class="control-label big-bold-text col-lg-4 col-md-8 col-sm-12">
        Room and Building: 265 CTB or 230 SNLB</label>
    </div>

    <br />

    <div class="row">
      <div class="col-lg-12">
        <p class="main-text">
          I am an employee at the office listed above, and understand that by virtue of my employment with Brigham Young University,
                    I may have access to records which contain individually identifiable information, the disclosure of which
                    is prohibited by the Family Educational Rights and Privacy Act (FERPA) of 1974. I acknowledge that I
                    fully understand that the intentional disclosure by me of this information to any unauthorized person
                    could subject me to criminal and civil penalties imposed by law. I also acknowledge that I will only
                    access the records I have a legitimate need to view in order to fulfill my university assignment. I further
                    acknowledge that willful or unauthorized access or disclosure violates policies of Brigham Young University,
                    and could constitute just cause for disciplinary action including termination of my employment regardless
                    of whether criminal or civil penalties are imposed.
        </p>
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col-lg-2"></div>
      <div class="col-lg-8 border-div" id="note-text">

        <div>
          Please Note: You must watch the FERPA Training Video (a brief presentation about maintaining confidentiality of records and
                    information, entitled “FERPA: Handling Educational Records”) before you will be given access to such
                    electronic hard information.
        </div>
      </div>
      <div class="col-lg-2"></div>
    </div>
    <br />
    <div class="row">
      <div class="col-lg-2"></div>
      <div class="col-lg-6 border-div">
        <p id="cb-help-text">
          By selecting this checkbox, you are digitally signing that you understand and agree to this Confidentiality
                    of Records Agreement
        </p>
      </div>
      <div class="container-fluid col-lg-2">
        <div class="row">
          <input class="input" id="submitCheckbox" style="zoom: 2" type="checkbox" />
          <label style="font-size: 20px; line-height: 22px; vertical-align: bottom" for="submitCheckbox">I Agree</label>
          <div class="col-lg-2"></div>

        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-8"></div>
      <div class="col-lg-1">
        <input type="button" class="form-btn-group" value="Cancel" id="cancelButton" />
      </div>
      <div class="col-lg-1">
        <input type="button" class="form-btn-group" value="Submit" id="submitButton" />
      </div>
      <div class="col-lg-2"></div>
    </div>
  </div>



</asp:Content>
