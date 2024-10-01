import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  // @font-face 선언
  @font-face {
    font-family: 'Paperlogy';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-3Light.woff2') format('woff2');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Paperlogy';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-4Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Paperlogy';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-5Medium.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Paperlogy';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-6SemiBold.woff2') format('woff2');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Paperlogy';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-7Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  // 공통 CSS
  *, *::before, *::after {
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
  button {
    padding: 0;
    background: none;
    border: 0;
    outline: 0;
    font-family: 'Paperlogy', sans-serif;
    cursor: pointer;
  }
	select, input {
    font-family: 'Paperlogy', sans-serif;
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
	.clear::after {
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
  footer .logo a {
    display: block;
  }
  footer .logo img {
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
    right: 10vh;
    bottom: 100px;
    font-size: 0;
  }
  footer .floating li:first-child {
    margin-bottom: 6px;
  }
  footer .floating li a {
    display: block;
  }

	// 구글맵 검색
	.pac-container {
		margin-top: -2px;
		border: 1px solid #ddd;
    box-shadow: 0 5px 8px rgba(0, 0, 0, .05)
    border-radius: 0;
		font-family: 'Paperlogy', sans-serif;
	}
	.pac-logo:after {
		display: none;
	}
	.pac-item {
		padding: 5px 20px;
		font-size: 13px;
		color: #888;
	}
	.pac-item-query {
		padding-right: 10px;
		font-size: 16px;
		color: #121212;
	}
	.pac-matched {
		font-weight: 500;
	}

  /* media size */
  @media (max-width: 1650px) {
    body {
      font-size: 14px;
    }
    .inner {
		  max-width: 1200px;
    }
    .size_xxs {
      font-size: 11px;
    }
    .size_xs {
      font-size: 12px;
    }
    .size_sm {
      font-size: 14px;
    }
    .size_md {
      font-size: 16px;
    }
    .size_lg {
      font-size: 18px;
    }
    .size_xl {
      font-size: 20px;
    }
  }

  @media (max-width: 1215px) {
    body {
      font-size: 14px;
    }
    .inner {
      max-width: 900px;
    }
    .size_xxs {
      font-size: 10px;
    }
    .size_xs {
      font-size: 11px;
    }
    .size_sm {
      font-size: 12px;
    }
    .size_md {
      font-size: 14px;
    }
    .size_lg {
      font-size: 16px;
    }
    .size_xl {
      font-size: 18px;
    }
    
    header {
      height: 85px;
    }
    header .logo {
      width: 110px;
    }
    header .logo a {
      display: block;
    }
    header nav ul li a {
      font-size: 15px;
      font-weight: 500;
    }

    footer {
      margin-top: 150px;
      padding: 60px 0;
    }
    footer .logo {
      width: 110px;
    }
    footer .info {
      margin-left: 40px;
    }
    footer .floating {
      right: 5vh;
    }
    footer .floating img {
      width: 38px;
    }
  }

  @media (max-width: 700px) {
    .inner {
      width: 92%;
    }
    .size_md {
      font-size: 13px;
    }
    .size_lg {
      font-size: 15px;
    }

    header {
      padding: 15px 0 6px;
    }
    header .inner {
      align-items: unset;
      position: relative;
    }
    header .logo {
      width: 100px;
    }
    header nav {
      width: 100%;
    }
    header nav ul {
      justify-content: center;
      gap: 35px;
    }
    header .log {
      position: absolute;
      top: 0;
      right: 0;
    }
    header .log .btn_blk {
      display: none;
    }

    footer {
      margin-top: 100px;
      padding: 40px 0 50px;
    }
    footer .info {
      width: 100%;
      margin: 20px 0 0;
    }
    footer .floating {
      right: 4%;
      bottom: 60px
    }
  }
`;

export default GlobalStyles;