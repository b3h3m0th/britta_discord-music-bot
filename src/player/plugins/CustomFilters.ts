const { Structure } = require("erela.js");

Structure.extend(
  "Player",
  (Player) =>
    class extends Player {
      setTimescale(opts) {
        for (let key in opts) {
          if (typeof opts[key] !== "number")
            throw new RangeError(`Provided argument '${key}' must be a number`);
          if (opts[key] < 0)
            throw new RangeError(
              `Provided argument '${key}' cannot be smaller than 0.0.`
            );
        }

        opts = { pitch: 1.0, rate: 1.0, speed: 1.0, ...opts };

        this.node.send({
          guildId: this.guild,
          op: "filters",
          timescale: opts,
        });
      }
      setTremolo(opts) {
        for (let key in opts) {
          if (typeof opts[key] !== "number")
            throw new RangeError(`Provided argument '${key}' must be a number`);
        }

        opts = { frequency: 2.0, depth: 0.5, ...opts };

        if (opts.frequency < 0)
          throw new RangeError(
            "Frequency argument cannot be smaller than 0.0."
          );
        if (opts.depth < 0 || opts.depth > 1)
          throw new RangeError(
            "Depth argument cannot be smaller than 0.0 or bigger than 1.0."
          );

        this.node.send({
          guildId: this.guild,
          op: "filters",
          tremolo: opts,
        });
      }
      setKaraoke(opts) {
        for (let key in opts) {
          if (typeof opts[key] !== "number")
            throw new RangeError(`Provided argument '${key}' must be a number`);
        }

        opts = {
          mono: 1.0,
          monoLevel: 1.0,
          filterBand: 220,
          filterWidth: 100,
          ...opts,
        };

        this.node.send({
          guildId: this.guild,
          op: "filters",
          karaoke: opts,
        });
      }
      setVibrato(opts) {
        for (let key in opts) {
          if (typeof opts[key] !== "number")
            throw new RangeError(`Provided argument '${key}' must be a number`);
        }

        if (opts.frequency < 0 || opts.frequency > 14)
          throw new RangeError(
            "Frequency argument cannot be smaller than 0.0."
          );
        if (opts.depth < 0 || opts.depth > 1)
          throw new RangeError(
            "Depth argument cannot be smaller than 0.0 or bigger than 1.0."
          );

        opts = { frequency: 2.0, depth: 0.5, ...opts };

        this.node.send({
          guildId: this.guild,
          op: "filters",
          vibrato: opts,
        });
      }
    }
);
