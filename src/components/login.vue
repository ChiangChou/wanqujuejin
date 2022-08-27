<template>
  <div id="loginBackground">
    <div id="loginBlock">
      <div id="loginInfo">
        <h1>用户登录</h1>
        <div>
          <span class="loginType" :style="accountStyle">账号</span>
          <!--input不支持伪类-->
          <input
            name="account"
            type="text"
            @focus="inputAccountActive"
            @blur="inputAccountBlur"
            v-model="account"
          />
          <span
            :class="{
              inputBottomLine: isAccountBlur,
              inputBottomLineActive: !isAccountBlur,
            }"
          ></span>
        </div>
        <div>
          <span class="loginType" :style="passwordStyle">密码</span>
          <input
            name="password"
            type="password"
            minlength="8"
            maxlength="16"
            @focus="inputPassWordActive"
            @blur="inputPassWordBlur"
            v-model="password"
          />
          <span
            :class="{
              inputBottomLine: isPassWordBlur,
              inputBottomLineActive: !isPassWordBlur,
            }"
          ></span>
        </div>
        <button class="submit" @click="submit">
          <span>登录</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  props: {},
  methods: {
    inputAccountActive() {
      this.isAccountBlur = false;
      this.accountStyle = { "margin-top": "-20px" };
      
    },
    inputAccountBlur() {
      this.isAccountBlur = true;
      if (this.account === "") this.accountStyle = {};
    },
    inputPassWordActive() {
      this.isPassWordBlur = false;
      this.passwordStyle = { "margin-top": "-20px" };
    },
    inputPassWordBlur() {
      this.isPassWordBlur = true;
      if (this.password === "") this.passwordStyle = {};
    },
    submit(){
      console.log(this.account, this.password);
    },
  },
  data() {
    return {
      account: "",
      password: "",
      accountStyle: {},
      passwordStyle: {},
      isAccountBlur: true,
      isPassWordBlur: true,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#loginBackground {
  background-color: RGBA(36, 36, 36, 0.5);
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
}
#loginBlock {
  height: auto;
  width: 350px;
  background-color: #f5f5f5;
  border-radius: 8px;
  border: 2px solid RGBA(49, 140, 203, 0.7);
  color: #aaa;
}

#loginInfo {
  margin: 50px 50px;
  width: auto;
  font-size: 16px;
}

#loginInfo h1 {
  font-size: 28px;
  font-weight: 400;
  color: #318ce7;
}

#loginInfo div {
  margin-top: 30px;
}

#loginInfo input {
  border: none;
  outline: none;
  z-index: 2;
  height: 28px;
  width: 100%;
  position: relative;
  padding: 0;
  font-size: 16px;
  color: #222;
  background-color: transparent;
  margin-left: 2px;
  top:0;
}

.loginType {
  position: absolute;
  z-index: 1;
  margin-top: -5px;
  margin-left: 3px;
  transition: margin-top, 0.5s;
}

.widthNone{
  background-color: #318ce7;
  display: block;
  width: 0;
  height: 1px;
  transition: 0.1s;
}

.inputBottomLine {
  background-color: #ccc;
  display: block;
  width: 250px;
  height: 1px;
}

.inputBottomLineActive {
  background-color: #318ce7;
  display: block;
  height: 1px;
  animation: stretch 0.5s;
  animation-fill-mode: forwards;
  animation-direction: alternate;
  transform: translate(-50%);
  margin-left: 50%;
}

@keyframes stretch {
  from {
    /*inline-block时不能是'width: 0'否则会闪烁，而block就不会出现这种问题*/
    width: 0;
  }
  to {
    width: 100%;
  }
}

.submit{
  display: block;
  margin: 40px auto 0;
  background-color: #318ce7; 
  border: none;
  width:100%;
  font-size: 16px;
  padding: 15px 0;
  border-radius: 5px;
  color: #f5f5f5;
  transition: 0.5s;
}

.submit:hover{
  background-color: #00aaff;
  transition: 0.5s;
}
</style>
