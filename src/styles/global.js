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
	.pt_black {
    color: black;
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
		background: rgba(255, 255, 255, 0.8);

		.inner {
			align-items: center;
			justify-content: space-between;
			height: 100%;
		}

		nav ul {
			gap: 80px;

			li {
				a {
					display: block;
					font-size: 18px;
					transition: 0.2s;

					&:hover {
						color: #15B8FF;
					}
				}

				&.active a {
					font-weight: 600;
				}
			}
		}

		.login {
			gap: 10px;

			a:first-child {
				margin-right: 16px;
			}
		}
	}

	/* footer */
  footer {
    margin-top: 200px;
		padding: 80px 0;
		border-top: 1px solid #ededed;
		background: #fff;

		.inner {
			position: relative;
		}

		.logo {
			a {
				display: block;
			}

			img {
				width: 200px;
			}
		}

		.info {
			margin-left: 80px;

			span {
				display: inline-block;
				margin: 0 20px 5px 0;
			}

			p {
				margin-top: 10px;
			}
		}

		.menu {
			position: absolute;
			top: 0;
			right: 0;
			text-align: right;

			li:first-child {
				margin-bottom: 10px;
			}

			li {
				a {
					color: #777;
					transition: 0.2s;

					&:hover {
						color: #000;
					}
				}
			}
		}
  }

  .floating-wrapper {
    position: fixed;
		right: 20vh;
		bottom: 100px;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 6px;
		z-index: 10;

		.floating {
			font-size: 0;

			li:first-child {
				margin-bottom: 6px;
			}

			li {
				a {
					display: block;
				}
			}
		}
  }

  .chatbot-popup {
    position: absolute;
    bottom: 60px;
    right: 0;
    z-index: 20;
    width: 350px;
    padding: 20px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background: white;
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

		.floating-wrapper {
      right: 5vh;
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

			.logo {
				width: 110px;

				a {
					display: block;
				}
			}

			nav ul li {
				a {
					font-size: 14px;
					font-weight: 500;
				}
			}
    }

    footer {
      margin-top: 150px;
			padding: 60px 0;

			.logo {
				width: 110px;
			}

			.info {
				margin-left: 40px;
			}
    }

    .floating-wrapper {
			.floating img {
				width: 38px;
			}
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
		h2 {
			font-size: 28px;
		}

    header {
      padding: 15px 0 6px;

			.inner {
				align-items: unset;
				position: relative;
			}

			.logo {
				width: 100px;
			}

			nav {
				width: 100%;

				ul {
					justify-content: center;
					gap: 35px;
				}
			}

			.log {
				position: absolute;
				top: 0;
				right: 0;

				.btn_blk {
					display: none;
				}
			}
    }

    footer {
      margin-top: 100px;
			padding: 40px 0 50px;

			.info {
				width: 100%;
				margin: 20px 0 0;
			}
    }
		
		.floating-wrapper {
			right: 4%;
			bottom: 60px;
		}
  }
`;

export default GlobalStyles;
