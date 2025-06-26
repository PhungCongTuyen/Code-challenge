import React from "react";

const Problem1 = () => {
  return (
    <div className="p-4">
      <div className="font-bold">Three way to sum n</div>
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-4 border-gray-400 border rounded p-1">
          <code>
            <div>var sum_to_n_a = function(n) &#123;</div>
            <div className="ml-4">let sum = 0;</div>
            <div className="ml-4">for (let i = 1; i &lt;= n; i++) &#123;</div>
            <div className="ml-8">sum += i;</div>
            <div className="ml-4">&#125;</div>
            <div className="ml-4">return sum;</div>
            <div>&#125;;</div>
          </code>
        </div>
        <div className="col-span-4 border-gray-400 border rounded p-1">
          <code>
            <div>var sum_to_n_b = function(n) &#123;</div>
            <div className="ml-4">return n * (n + 1) / 2;</div>
            <div>&#125;;</div>
          </code>
        </div>
        <div className="col-span-4 border-gray-400 border rounded p-1">
          <code>
            <div>var sum_to_n_c = function(n) &#123;</div>
            <div className="ml-4">if (n &lt; 1) return n;</div>
            <div className="ml-4">return n + sum_to_n_c(n - 1);</div>
            <div>&#125;;</div>
          </code>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
