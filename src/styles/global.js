import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  // @font-face 선언
  @font-face {
    font-family: 'Paperlogy';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-3Light.woff2') format('woff2');
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
    font-family: 'Paperlogy';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-4Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Paperlogy';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-5Medium.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'Paperlogy';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-6SemiBold.woff2') format('woff2');
    font-weight: 600;
    font-style: normal;
  }
  @font-face {
    font-family: 'Paperlogy';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-7Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
  }
  

  // 공통 CSS
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    width: 100%;
    height: 100%;
  }
  body {
    font-family: 'Paperlogy', sans-serif;
    font-size: 16px;
    color: #2C2C2C;
    line-height: 1.2;
    word-break: keep-all;
  }
  li {
    list-style: none;
  }
  img {
    max-width: 100%;
    border: none;
    vertical-align: top;
  }
  a {
    text-decoration: none;
    color: #000;
  }
	.inner {
		max-width: 1600px;
		margin: 0 auto;
	}
    
	/* point color */
	.pt_gy {
    color: #888;
	}
  .pt_blue {
    color: #14B8FF;
  }
  .pt_pink {
    color: #F78C9F;
  }

  /* font */
  h2 {
    font-size: 36px;
    font-weight: 500;
  }
	.size_xxs {
    font-size: 12px;
	}
  .size_xs {
    font-size: 14px;
	}
	.size_sm {
		font-size: 16px;
	}
	.size_md {
		font-size: 18px;
	}
	.size_lg {
		font-size: 20px;
	}
	.size_xl {
		font-size: 24px;
	}
  .weight_md {
    font-weight: 500;
  }
  .weight_sb {
    font-weight: 600;
  }
  .weight_b {
    font-weight: 700;
  }

  /* button */
  a[class^="btn_"],
  button[class^="btn_"]  {
    display: inline-block;
    position: relative;
    padding: 10px 15px;
    border-radius: 8px;
    font-size: 16px;
    line-height: 1;
    text-align: center;
    transition: 0.2s ease-in;
    cursor: pointer;
  }
  
  .btn_sm {
  padding: 10px 18px;
    font-size: 14px;
  }
  .btn_lg {
    padding: 11px 20px;
    font-size: 18px;
  }
  .btn_xl {
    padding: 16px 20px;
    font-size: 20px;
  }
  .btn_xl {
    padding: 20px 118px;
    border-radius: 16px;
    font-size: 24px;
  }

  .btn_blk {
    background: #121212;
    color: #fff;
  }
  .btn_blk:hover {
    background: #999;
  }
  .btn_wht {
    border: 1px solid #999;
    background: #fff;
    color: #121212;
  }
  .btn_wht:hover {
    border: 1px solid #121212;
  }
  .btn_gy {
    background: #999;
    color: #fff;
  }
  .btn_gy:hover {
    background: #121212;
  }
  .btn_blue {
    background: #14B8FF;
    color: #fff;
  }
  .btn_blue:hover {
    background: rgba(20, 184, 255, 0.7);
  }
  .btn_pink {
    background: #F78C9F;
    color: #fff;
  }
  .btn_pink:hover {
    background: rgba(247, 140, 159, 0.7);
  }
  .disabled {
    background: #ddd !important;
    color: #fff !important;
    pointer-events: none;
    cursor: default;
  }

	/* position */
	.flex {
		display: flex;
		flex-wrap: wrap;
	}
	.fleft {
		float: left;
	}
	.fright {
		float: right;
	}
	.clear:after {
		content: '';
		display: block;
		clear: both;
	}

	/* header */
	header {
		position: sticky;
    top: 0;
    z-index: 10;
    height: 100px;
    background: rgba(255,255,255,0.8);
	}
	header .inner {
		align-items: center;
    justify-content: space-between;
    height: 100%;
	}
	header nav ul {
		gap: 80px;
	}
	header nav ul li a {
		display: block;
		font-size: 18px;
		transition: 0.2s;
	}
	header nav ul li a:hover {
		color: #15B8FF;
	}	
	header nav ul li.active a {
		font-weight: 600;
	}
  header .login a:first-child {
    margin-right: 16px;
  }

	/* footer */
  footer {
    margin-top: 200px;
    padding: 80px 0;
    border-top: 1px solid #ededed;
    background: #fff;
  }
  footer .inner {
    position: relative;
  }
  footer h2 a {
    display: block;
  }
  footer h2 img {
    width: 200px;
  }
  footer .info {
    margin-left: 80px;
  }
  footer .info span {
    display: inline-block;
    margin: 0 20px 5px 0;
  }
  footer .info p {
    margin-top: 10px;
  }
  footer .menu {
    position: absolute;
    top: 0;
    right: 0;
    text-align: right;
  }
  footer .menu li:first-child {
    margin-bottom: 10px;
  }
  footer .menu li a {
    color: #777;
    transition: 0.2s;
  }
  footer .menu li:hover a {
    color: #000;
  }
  footer .floating {
    position: fixed;
    z-index: 10;
    bottom: 200px;
    right: 100px;
    width: 50px;
  }
  footer .floating li:first-child {
    margin-bottom: 10px;
  }
  footer .floating li a {
    display: block;
  }
  footer .floating li a img {}

  /* media size */
  @media (max-width: 1600px) {}

  @media (max-width: 760px) {}
`;

export default GlobalStyles;
