package com.neauroscience.gs;

import com.getcapacitor.BridgeActivity;
import androidx.core.view.WindowCompat;

public class MainActivity extends BridgeActivity {
    // JAVA version

    @Override
    public void onStart() {
        super.onStart();
        // This tells the window to respect the system bars (icons)
        WindowCompat.setDecorFitsSystemWindows(getWindow(), true);
    }
}
