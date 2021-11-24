package com.mypackage.name;

// Import necessary libraries
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.app.AppCompatDelegate;
import androidx.webkit.WebSettingsCompat;
import androidx.webkit.WebViewFeature;

import android.content.res.Configuration;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.webkit.JavascriptInterface;
import android.webkit.PermissionRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;

// Debug
import android.util.Log;

public class MainActivity extends AppCompatActivity {

    // Define some class-level variables
    int statusBarHeight,
        currentAppVersionCode = -7;
    WebView contentWebView;

    // Update the status bar height variable
    public void updateStatusBarHeight(){

        // Reset the status bar height
        statusBarHeight = 0;

        int resourceId = getResources().getIdentifier("status_bar_height", "dimen", "android");
        if (resourceId > 0) {

            statusBarHeight = getResources().getDimensionPixelSize(resourceId);

        }

    }

    // Update the layout to fit the whole screen
    public void updateLayout(){

        // Display content under the status bar
        View appView = getWindow().getDecorView();
        appView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_STABLE | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);

    }

    // Setup the WebView
    public void setupWebView(){

        // Get the WebView element from the "activity_main.xml" file
        contentWebView = findViewById(R.id.ContentWebView);

        // Manage the settings of the WebView
        WebSettings contentWebViewSettings = contentWebView.getSettings();
        contentWebViewSettings.setJavaScriptEnabled(true);
        contentWebViewSettings.setDomStorageEnabled(true);
        contentWebViewSettings.setAppCacheEnabled(false);
        contentWebViewSettings.setCacheMode(WebSettings.LOAD_NO_CACHE);
        contentWebViewSettings.setBuiltInZoomControls(false);

        // Link the required APIs for the app to work
        contentWebView.addJavascriptInterface(MainActivity.this, "androidAPIs");

        // Get microphone permissions
        // ?????

        // Force links and redirects to open in the WebView instead of in a browser
        // contentWebView.setWebViewClient(new WebViewClient());

        // Get the console messages (debug)
        contentWebView.setWebChromeClient(new WebChromeClient() {

            @Override
            public void onPermissionRequest(final PermissionRequest request) {

                request.grant(request.getResources());

            }

            // Debug
            @Override
            public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
                Log.e("MyApplication", consoleMessage.message() + " -- From line " +
                        consoleMessage.lineNumber() + " of " + consoleMessage.sourceId());
                return true;
            }

        });

    }

    // Define the main function
    // For more info about these events: https://developer.android.com/guide/components/activities/activity-lifecycle
    @Override
    protected void onCreate(Bundle savedInstanceState) {

        // Default code
        super.onCreate(savedInstanceState);

        // Hide the title bar and action bar
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getSupportActionBar().hide();

        // Set the content view to the activity_main.xml file
        setContentView(R.layout.activity_main);

        updateStatusBarHeight();
        setupWebView();
        updateLayout();

        // Load the website (temp)
        contentWebView.loadUrl("https://store.mur-lang.org/page/home/?androidAppVersion=" + currentAppVersionCode);

    }

    @Override
    public void onBackPressed() {

        if(contentWebView.canGoBack()) {

            contentWebView.goBack();

        } else {

            super.onBackPressed();

        }

    }

    // @Override
    // public void onNightModeChanged(@AppCompatDelegate.NightMode int mode) {
    //
    //     super.onNightModeChanged(mode);
    //
    // }

    // Define all the "androidAPI" JS functions here!

    // A function that returns the status bar height (px)
    @JavascriptInterface
    public int getStatusBarHeight() {

        return statusBarHeight;

    }

    // A function that tells the website if the system is using dark mode
    public boolean isUsingDarkMode(){

        int nightModeFlags = getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK;

        return nightModeFlags == Configuration.UI_MODE_NIGHT_YES;

    }

}