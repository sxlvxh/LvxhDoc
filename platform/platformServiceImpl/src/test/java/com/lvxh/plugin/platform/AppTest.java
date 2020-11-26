package com.lvxh.plugin.platform;

import com.lvxh.plugin.platform.holder.TTHolder;
import com.lvxh.plugin.platform.impl.TTServiceImpl;

import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

/**
 * Unit test for simple App.
 */
public class AppTest 
    extends TestCase
{
    /**
     * Create the test case
     *
     * @param testName name of the test case
     */
    public AppTest( String testName )
    {
    	TTHolder holder = new TTHolder();
        new TTServiceImpl().delete(holder);
    }

    /**
     * @return the suite of tests being tested
     */
    public static Test suite()
    {
        return new TestSuite( AppTest.class );
    }

    /**
     * Rigourous Test :-)
     */
    public void testApp()
    {
    	
    }
    
    
}
