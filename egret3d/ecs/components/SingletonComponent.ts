namespace paper {
    interface SingletonComponentClass<T extends SingletonComponent> extends ComponentClass<T> {
        /**
         * @internal
         */
        __instance: T | null;
    };
    /**
     * 单例组件基类。
     */
    export abstract class SingletonComponent extends BaseComponent {
        /**
         * @internal
         */
        public static readonly __isSingleton: boolean = true;
        /**
         * @internal
         */
        public static __instance: SingletonComponent | null = null;
        /**
         * 
         */
        public static getInstance<T extends SingletonComponent>(componentClass: ComponentClass<T>): T {
            return paper.Application.sceneManager.globalGameObject.getOrAddComponent<T>(componentClass) as T;
        }

        public initialize() {
            super.initialize();

            if (!(this.constructor as SingletonComponentClass<SingletonComponent>).__instance) {
                (this.constructor as SingletonComponentClass<SingletonComponent>).__instance = this;
            }
        }

        public uninitialize() {
            super.uninitialize();

            if ((this.constructor as SingletonComponentClass<SingletonComponent>).__instance === this) {
                (this.constructor as SingletonComponentClass<SingletonComponent>).__instance = null;
            }
        }
    }
}