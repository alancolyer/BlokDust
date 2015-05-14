/**
 * Created by luketwyman on 14/02/2015.
 */
import BlocksSketch = require("./../BlocksSketch");
import IEffect = require("../Blocks/IEffect");
import ISource = require("../Blocks/ISource");
import IBlock = require("../Blocks/IBlock");

class ConnectionLines {

    private _Ctx: CanvasRenderingContext2D;
    private _GridCell: number;
    private _Sketch: BlocksSketch;

    Init(sketch: BlocksSketch): void {

        this._Ctx = sketch.Ctx;
        this._Sketch = sketch;
        this._GridCell = sketch.CellWidth.width;
    }

    Draw() {

        this._Ctx.strokeStyle = App.Palette[15];// BLUE
        this._Ctx.lineWidth = 1;
        this._Ctx.beginPath();

        for (var j = 0; j < App.Blocks.length; j++) {
            var block: IBlock = App.Blocks[j];
            if ((<ISource>block).Effects) {

                // draw connections to modifiers
                var modifiers = (<ISource>block).Effects.ToArray();

                var grd = this._Sketch.ScaledCellWidth.width; // this.Grid.Width / this.Grid.Divisor;

                for(var i = 0; i < modifiers.length; i++){
                    var target: IEffect = modifiers[i];

                    var myPos = this._Sketch.ConvertGridUnitsToAbsolute(block.Position);
                    myPos = this._Sketch.ConvertBaseToTransformed(myPos);
                    var targetPos = this._Sketch.ConvertGridUnitsToAbsolute(target.Position);
                    targetPos = this._Sketch.ConvertBaseToTransformed(targetPos);

                    var xDif = (targetPos.x - myPos.x) / grd;
                    var yDif = (targetPos.y - myPos.y) / grd;


                    this._Ctx.moveTo(myPos.x, myPos.y);

                    if (xDif > 0) { // RIGHT HALF

                        if (yDif < 0) { // UPPER

                            if (-yDif < xDif) {
                                this._Ctx.lineTo(Math.round(myPos.x + ((xDif - (-yDif))*grd)), Math.round(myPos.y));
                            }

                            if (-yDif > xDif) {
                                this._Ctx.lineTo(Math.round(myPos.x), Math.round(myPos.y - (((-yDif) - xDif)*grd)));
                            }

                        }

                        if (yDif > 0) { // LOWER

                            if (yDif < xDif) {
                                this._Ctx.lineTo(Math.round(myPos.x + ((xDif - yDif)*grd)), Math.round(myPos.y));
                            }

                            if (yDif > xDif) {
                                this._Ctx.lineTo(Math.round(myPos.x), Math.round(myPos.y + ((yDif - xDif)*grd)));
                            }
                        }
                    }

                    if (xDif < 0) { // LEFT HALF

                        if (yDif < 0) { // UPPER

                            if (yDif > xDif) {
                                this._Ctx.lineTo(Math.round(myPos.x - ((yDif - xDif)*grd)), Math.round(myPos.y));
                            }

                            if (yDif < xDif) {
                                this._Ctx.lineTo(Math.round(myPos.x), Math.round(myPos.y - ((xDif - yDif)*grd)));
                            }

                        }

                        if (yDif > 0) { // LOWER

                            if (yDif < -xDif) {
                                this._Ctx.lineTo(Math.round(myPos.x - (((-xDif) - yDif)*grd)), Math.round(myPos.y));
                            }

                            if (yDif > -xDif) {
                                this._Ctx.lineTo(Math.round(myPos.x), Math.round(myPos.y + ((yDif - (-xDif))*grd)));
                            }

                        }

                    }

                    this._Ctx.lineTo(targetPos.x, targetPos.y);
                }


            }
        } // end loop

        this._Ctx.stroke();
    }

}

export = ConnectionLines;