module.exports = `
<p>Let us look at a simple case where we call:</p>

<pre class="lang-hs prettyprint prettyprinted" style=""><code><span class="pln">filterM </span><span class="pun">(</span><span class="pln">const </span><span class="pun">[</span><span class="pln">True</span><span class="pun">,</span><span class="pln"> False</span><span class="pun">])</span><span class="pln"> </span><span class="pun">[</span><span class="lit">0</span><span class="pun">]</span></code></pre>

<p>We expect that this will return <code>[[0], [0]]</code>. If we take a look at the first implementation, we see that this will result in:</p>

<pre class="lang-hs prettyprint prettyprinted" style=""><code><span class="pln">filterM </span><span class="pun">(</span><span class="pln">const </span><span class="pun">[</span><span class="pln">True</span><span class="pun">,</span><span class="pln"> False</span><span class="pun">])</span><span class="pln"> </span><span class="pun">(</span><span class="lit">0</span><span class="pun">:[])</span><span class="pln"> </span><span class="pun">=</span><span class="pln"> </span><span class="kwd">do</span><span class="pln">
    n </span><span class="pun">&lt;-</span><span class="pln"> </span><span class="pun">[</span><span class="pln">True</span><span class="pun">,</span><span class="pln"> False</span><span class="pun">]</span><span class="pln">
    ys </span><span class="pun">&lt;-</span><span class="pln"> </span><b><span class="pln">filterM </span><span class="pun">(</span><span class="pln">const </span><span class="pun">[</span><span class="pln">True</span><span class="pun">,</span><span class="pln"> False</span><span class="pun">])</span><span class="pln"> </span><span class="pun">[]</span></b><span class="pln">
    return </span><span class="pun">(</span><span class="kwd">if</span><span class="pln"> n </span><span class="kwd">then</span><span class="pln"> </span><span class="lit">0</span><span class="pun">:</span><span class="pln">ys </span><span class="kwd">else</span><span class="pln"> </span><span class="lit">0</span><span class="pun">:[])</span></code></pre>

<p>If we take the first implementation, the the <code>filterM (const [True, False]) []</code> will result in <code>[]</code>. So this means that it will look like:</p>

<pre class="lang-hs prettyprint prettyprinted" style=""><code><span class="com">-- first implementation</span><span class="pln">
filterM </span><span class="pun">(</span><span class="pln">const </span><span class="pun">[</span><span class="pln">True</span><span class="pun">,</span><span class="pln"> False</span><span class="pun">])</span><span class="pln"> </span><span class="pun">(</span><span class="lit">0</span><span class="pun">:[])</span><span class="pln"> </span><span class="pun">=</span><span class="pln"> </span><span class="kwd">do</span><span class="pln">
    n </span><span class="pun">&lt;-</span><span class="pln"> </span><span class="pun">[</span><span class="pln">True</span><span class="pun">,</span><span class="pln"> False</span><span class="pun">]</span><span class="pln">
    ys </span><span class="pun">&lt;-</span><span class="pln"> </span><b><span class="pun">[]</span></b><span class="pln">
    return </span><span class="pun">(</span><span class="kwd">if</span><span class="pln"> n </span><span class="kwd">then</span><span class="pln"> </span><span class="lit">0</span><span class="pun">:</span><span class="pln">ys </span><span class="kwd">else</span><span class="pln"> </span><span class="lit">0</span><span class="pun">:[])</span></code></pre>

<p>Since for the <code>instance Monad []</code>, <a href="https://hackage.haskell.org/package/base-4.14.0.0/docs/src/GHC.Base.html#line-1133" rel="nofollow noreferrer">the <strong><code>&gt;&gt;=</code></strong> is implemented as</a>:</p>

<blockquote><pre class="lang-hs prettyprint prettyprinted" style=""><code><span class="kwd">instance</span><span class="pln"> Monad </span><span class="pun">[]</span><span class="pln"> </span><span class="kwd">where</span><span class="pln">
    return x </span><span class="pun">=</span><span class="pln"> </span><span class="pun">[</span><span class="pln">x</span><span class="pun">]</span><span class="pln">
    xs </span><span class="pun">&gt;&gt;=</span><span class="pln"> f </span><span class="pun">=</span><span class="pln"> </span><span class="pun">[</span><span class="pln">y </span><span class="pun">|</span><span class="pln"> x </span><span class="pun">&lt;-</span><span class="pln"> xs</span><span class="pun">,</span><span class="pln"> y </span><span class="pun">&lt;-</span><span class="pln"> f x</span><span class="pun">]</span></code></pre></blockquote>

<p>this thus means that if <code>xs</code> is empty, then the result will be emtpy as well.</p>

<p>In the second implementation, <code>return []</code> will result in <code>[[]]</code>, so a <em>singleton list</em> where the single element is an empty list. In that case, it thus looks like:</p>

<pre class="lang-hs prettyprint prettyprinted" style=""><code><span class="com">-- second implementation</span><span class="pln">
filterM </span><span class="pun">(</span><span class="pln">const </span><span class="pun">[</span><span class="pln">True</span><span class="pun">,</span><span class="pln"> False</span><span class="pun">])</span><span class="pln"> </span><span class="pun">(</span><span class="lit">0</span><span class="pun">:[])</span><span class="pln"> </span><span class="pun">=</span><span class="pln"> </span><span class="kwd">do</span><span class="pln">
    n </span><span class="pun">&lt;-</span><span class="pln"> </span><span class="pun">[</span><span class="pln">True</span><span class="pun">,</span><span class="pln"> False</span><span class="pun">]</span><span class="pln">
    ys </span><span class="pun">&lt;-</span><span class="pln"> </span><b><span class="pun">[[]]</span></b><span class="pln">
    return </span><span class="pun">(</span><span class="kwd">if</span><span class="pln"> n </span><span class="kwd">then</span><span class="pln"> </span><span class="lit">0</span><span class="pun">:</span><span class="pln">ys </span><span class="kwd">else</span><span class="pln"> </span><span class="lit">0</span><span class="pun">:[])</span></code></pre>

<p>This thus means that we enumerate over the list, and <code>ys</code> will take the value <code>[]</code>, so it will result in a list <code>[[0], [0]]</code>.</p>

<p>Normally the filter will however not prepend <code>x</code> in both cases, furthermore you probably want to yield <code>x:ys</code> and <code>ys</code>; not <code>x:ys</code> and <code>x:xs</code>. A correct implementation is thus:</p>

<pre class="lang-hs prettyprint prettyprinted" style=""><code><span class="pln">filterM </span><span class="pun">::</span><span class="pln"> Monad m </span><span class="pun">=&gt;</span><span class="pln"> </span><span class="pun">(</span><span class="pln">a </span><span class="pun">-&gt;</span><span class="pln"> m Bool</span><span class="pun">)</span><span class="pln"> </span><span class="pun">-&gt;</span><span class="pln"> </span><span class="pun">[</span><span class="pln">a</span><span class="pun">]</span><span class="pln"> </span><span class="pun">-&gt;</span><span class="pln"> m </span><span class="pun">[</span><span class="pln">a</span><span class="pun">]</span><span class="pln">
filterM </span><span class="kwd">_</span><span class="pln"> </span><span class="pun">[]</span><span class="pln"> </span><span class="pun">=</span><span class="pln"> return </span><span class="pun">[]</span><span class="pln">
filterM p </span><span class="pun">(</span><span class="pln">x</span><span class="pun">:</span><span class="pln">xs</span><span class="pun">)</span><span class="pln"> </span><span class="pun">=</span><span class="pln"> </span><span class="kwd">do</span><span class="pln">
    n </span><span class="pun">&lt;-</span><span class="pln"> p x
    ys </span><span class="pun">&lt;-</span><span class="pln"> filterM p xs
    return </span><span class="pun">(</span><span class="kwd">if</span><span class="pln"> n </span><span class="kwd">then</span><span class="pln"> </span><b><span class="pln">x</span><span class="pun">:</span><span class="pln">ys</span></b><span class="pln"> </span><span class="kwd">else</span><span class="pln"> </span><b><span class="pln">ys</span></b><span class="pun">)</span></code></pre>`;