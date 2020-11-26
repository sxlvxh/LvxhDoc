<sitemesh>
    <!--默认情况下，
        sitemesh 只对 HTTP 响应头中 Content-Type 为 text/html 的类型进行拦截和装饰，
        我们可以添加更多的 mime 类型-->
  <!-- <mime-type>text/html</mime-type>
  <mime-type>application/vnd.wap.xhtml+xml</mime-type>
  <mime-type>application/xhtml+xml</mime-type> -->
  <!-- 默认装饰器，当下面的路径都不匹配时，启用该装饰器进行装饰 -->
<mapping decorator="/decorator/index.jsp"/>
  
  <!-- 对不同的路径，启用不同的装饰器 -->
<!--   <mapping path="/face_/*" decorator="/decorators/face.jsp"/> -->


   
  

  <!-- 对同一路径，启用多个装饰器 -->
  <!-- <mapping>
    <path>/articles/*</path>
    <decorator>/decorators/article.html</decorator>
    <decorator>/decorators/two-page-layout.html</decorator>
    <decorator>/decorators/common.html</decorator>
  </mapping> -->

  <!-- 排除，不进行装饰的路径 -->
  <mapping path="/user/login*" exclue="true"/>
  <!-- /html/viewyjqzrecord/map.html -->
  
  
  <!-- 自定义 tag 规则 -->
  <!-- <content-processor>
    <tag-rule-bundle class="com.something.CssCompressingBundle" />
    <tag-rule-bundle class="com.something.LinkRewritingBundle"/>
  </content-processor>
  ... -->

</sitemesh>