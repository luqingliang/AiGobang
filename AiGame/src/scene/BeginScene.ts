class BeginScene extends eui.Component implements  eui.UIComponent {

	//开始按钮
	public btn_begin:eui.Button;
	//选择对战模式的面板
	public selectPanel:eui.Group;
	//人机对战按钮
	public btn_playWithAi:eui.Button;
	//玩家对战按钮
	public btn_playWithPlayer:eui.Button;
	//返回按钮
	public btn_back:eui.Button;

	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	protected childrenCreated():void
	{
		super.childrenCreated();
		//注意要在页面加载完成后调用初始化方法，在构造函数中会报错
		this.init();
	}
	//初始化，并绑定事件
	public init() {
		this.showPanel(false);
		this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapHandler,this);
	}
	private tapHandler() {
		this.showPanel(true);
	}	
	private showPanel(status: boolean) {
		if(status) {
			this.selectPanel.visible = true;
			this.btn_playWithAi.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickPlayWithAi,this);
			this.btn_playWithPlayer.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickPlayWithPlayer,this);
			this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.backHandler,this);
		} else {
			this.selectPanel.visible = false;
			if(this.btn_playWithAi.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
				this.btn_playWithAi.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickPlayWithAi,this);
			}
			if(this.btn_playWithPlayer.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
				this.btn_playWithPlayer.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickPlayWithPlayer,this);
			}
			if(this.btn_back.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
				this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.backHandler,this);
			}
		}
	}
	private backHandler() {
		this.showPanel(false);
	}
	private clickPlayWithAi() {
		this.showPanel(false);
		Config.isPVP = false;
		//切换到游戏中场景
		SceneManager.Instance().changeScene(SceneManager.GAME_SCENE, true);
	}
	private clickPlayWithPlayer() {
		this.showPanel(false);
		Config.isPVP = true;
		//建立socket连接
		AiManager.webSocket.getConnect();
	}
	public release() {
		if(this.btn_begin.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
			this.btn_begin.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.tapHandler,this);
		}
	}
}